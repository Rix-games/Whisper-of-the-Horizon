(() => {
  // src/i18n/cs.ts
  var cs = {
    title: "\u0160epot Horizontu",
    res: {
      ore: "Ruda",
      metal: "Kov",
      energy: "Energie",
      data: "Data",
      plasma: "Plazma",
      exotic: "P\u011Bna"
    },
    resOf: { ore: "rudy", metal: "kovu", energy: "energie", data: "dat", plasma: "plazmatu", exotic: "p\u011Bny" },
    unit: {
      kg: { name: "kg \xB7 kilogram", text: "Hmotnost. 1 t = 1 000 kg. Mal\xFD asteroid o pr\u016Fm\u011Bru 1 km v\xE1\u017E\xED zhruba 10\xB9\xB2 kg." },
      J: { name: "J \xB7 joule", text: "Energie. Jeden joule dod\xE1 v\xFDkon 1 W za 1 sekundu. Slunce vyz\xE1\u0159\xED ka\u017Edou sekundu 3,8\xB710\xB2\u2076 J." },
      W: { name: "W \xB7 watt", text: "V\xFDkon, tedy energie za sekundu. LED \u017E\xE1rovka m\xE1 kolem 10 W, cel\xE9 lidstvo dnes asi 2\xB710\xB9\xB3 W." },
      B: { name: "B \xB7 bajt", text: "Mno\u017Estv\xED dat. 1 kB = 1 000 B, 1 MB = milion B. V\u0161echna data na sv\u011Bt\u011B maj\xED dohromady odhadem 10\xB2\xB3 B." },
      foam: { name: "Kvantov\xE1 p\u011Bna \xB7 kg", text: "V nejmen\u0161\xEDch m\u011B\u0159\xEDtc\xEDch je prostor zp\u011Bn\u011Bn\xFD drobounk\xFDmi \u010Derv\xEDmi d\xEDrami, kter\xE9 neust\xE1le vznikaj\xED a zanikaj\xED (John Wheeler, 1955). Kdy\u017E se takov\xE1 bublina nafoukne a udr\u017E\xED, vznikne hrdlo mostu. P\u011Bna se m\u011B\u0159\xED v kilogramech hmotnostn\xEDho ekvivalentu." },
      K: { name: "Karda\u0161evovo \u010D\xEDslo", text: "Ukazuje, kolik energie civilizace dok\xE1\u017Ee vyu\u017E\xEDt. Ka\u017Ed\xFD cel\xFD stupe\u0148 znamen\xE1 zhruba deset miliardkr\xE1t v\u011Bt\u0161\xED v\xFDkon. Nula odpov\xEDd\xE1 1 MW, v\xFDkonu velk\xE9 v\u011Btrn\xE9 turb\xEDny, pod n\xED vych\xE1z\xED \u010D\xEDslo z\xE1porn\xE9. Lidstvo je dnes na 0,73.", t1: "Typ I je v\xFDkon cel\xE9 planety.", t2: "Typ II je v\xFDkon cel\xE9 hv\u011Bzdy.", t3: "Typ III je v\xFDkon cel\xE9 galaxie, tedy stovek miliard hv\u011Bzd.", t4: "Typ IV je v\xFDkon miliardy galaxi\xED, daleko za hranic\xED t\xE9 na\u0161\xED." }
    },
    ui: {
      perSec: "/s",
      kardashevLabel: "\xDArove\u0148 civilizace",
      kBelow: "K < 0",
      toNext5: "Kapitola 5 se p\u0159ipravuje",
      toStageDone: "V\xFDkon pro dal\u0161\xED stadium m\xE1\u0161",
      toArm: "Typ III spln\u011Bn. K cel\xE9 oblasti ramene pot\u0159ebuje\u0161 {n}\xD7 v\xEDc v\xFDkonu",
      forYou: "Pro tebe",
      toTypeI: "Do Typu I pot\u0159ebuje\u0161 {n}\xD7 v\xEDc v\xFDkonu",
      toTypeIdone: "Typ I dosa\u017Een",
      toTypeII: "Do Typu II (v\xFDkon Slunce) pot\u0159ebuje\u0161 {n}\xD7 v\xEDc",
      toTypeIIdone: "Typ II dosa\u017Een",
      toFullStar: "Typ II (v\xFDkon Slunce) spln\u011Bn. Cel\xE1 Aldra: je\u0161t\u011B {n}\xD7 v\xEDc",
      toNext: "Kapitola 4 se p\u0159ipravuje",
      toPhase: "K {k}: pot\u0159ebuje\u0161 {n}\xD7 v\xEDc v\xFDkonu",
      toPhaseDone: "V\xFDkon pro dal\u0161\xED f\xE1zi m\xE1\u0161",
      diskGlow: "Z\xE1\u0159en\xED disku",
      captured: "Pro tebe",
      capturedTxt: "Kolektory chyt\xED {p} z\xE1\u0159en\xED: Energie +{w}",
      clockDil: "U stanic plyne \u010Das {g}\xD7 pomaleji",
      outside: "Venku uplynulo {t}",
      prod: { title: "Produkce", hole: "D\xEDra", power: "V\xFDkon civilizace", dil: "Dilatace u stanic", fromVent: "pos\xEDl\xE1\u0161 ru\u010Dn\u011B", fromInj: "pos\xEDlaj\xED injektory", from: { ring: "z disku", jet: "z trysek", hawking: "z Hawkingov\xFDch reaktor\u016F" } },
      outsideTip: "Den je den Vesperova bd\u011Bn\xED. Mezi sm\u011Bnami Vesper sp\xED a roj pracuje s\xE1m, tak\u017Ee venku plyne \u010Das mnohem rychleji.",
      vent: {
        flow: "Z disku do d\xEDry",
        share: "Pln\u011Bn\xED pasti",
        disk: "Plyn v disku",
        toTrap: "Do pasti",
        fromTrap: "Z pasti",
        toTrapTxt: "{p} % plynu, +{f}/s",
        flowHelp: "Nab\u011Bra\u010De sb\xEDraj\xED plazma, \u010D\xE1st pln\xED past|Kliknut\xEDm do disku vypust\xED\u0161 chuchvalec|Chuchvalec se sto\u010D\xED k d\xED\u0159e a vzplane: data|Plyn v disku pak 1,5 min z\xE1\u0159\xED, kolektory z toho d\u011Blaj\xED v\xFDkon. Kdy\u017E nic nepo\u0161le\u0161, disk vyhasne",
        shareBtn: "Do pasti {p} % plazmatu",
        heat: "\u017D\xE1r disku",
        overShort: "nad mez\xED {s} s",
        tank: "Magnetick\xE1 past",
        chain: "\u0158et\u011Bz",
        best: "nejdel\u0161\xED {n}",
        fall: "Zp\u011Btn\xFD p\xE1d",
        hover: "{kg} \xB7 let {s} s",
        tankLine: "Past {kg} \xB7 {p} %",
        chainBig: "\u0158et\u011Bz {n} \xB7 \xD7{m}",
        over: "V\xFDbuch disku \xB7 nad Eddingtonovou mez\xED {s} s",
        locked: "Past se otev\u0159e s v\xFDzkumem Akrece",
        burst: "V\xFDbuch disku",
        burstWait: "V\xFDbuch disku \xB7 past {p} %",
        hint: "Past se pln\xED z p\u0159\xEDr\u016Fstku plazmatu. Klikni nebo dr\u017E v disku a vypust\xED\u0161 ho. Po\u0161li dal\u0161\xED d\u0159\xEDv, ne\u017E prvn\xED dopadne, a \u0159et\u011Bz roste. Hned po pulsu chuchvalec zezl\xE1tne.",
        intro: "Plyn ze zp\u011Btn\xE9ho p\xE1du se chyt\xE1 do magnetick\xE9 pasti. Vypou\u0161t\xED\u0161 ho kliknut\xEDm do disku uprost\u0159ed. Ka\u017Ed\xFD z\xE1blesk d\xE1 data a roz\u017Ehav\xED disk, \u017E\xE1r zvy\u0161uje jeho z\xE1\u0159en\xED.",
        now: "Te\u010F",
        next: "Po vylep\u0161en\xED",
        max: "maximum",
        level: "\xFArove\u0148 {n}",
        upgrade: "Vylep\u0161it",
        v: {
          inlet: "{p} % z nab\u011Bra\u010D\u016F, {f}/s",
          valve: "{kg} v chuchvalci",
          trap: "pojme {kg}",
          radius: "{r} disku, let {s} s",
          coil: "\u0159et\u011Bz a\u017E {n}, +{p} % za \u010Dl\xE1nek",
          auto: "vypust\xED s\xE1m ka\u017Ed\xE9 {s} s",
          autoOff: "vypnuto"
        },
        u: {
          inlet: { name: "Sac\xED kan\xE1ly", desc: "V\xEDc plynu z nab\u011Bra\u010D\u016F jde rovnou do pasti." },
          valve: { name: "Ventil pasti", desc: "V\u011Bt\u0161\xED chuchvalec na jeden klik: v\xEDc dat a jasn\u011Bj\u0161\xED disk." },
          trap: { name: "Magnetick\xE1 past", desc: "Do pasti se vejde v\xEDc plynu: del\u0161\xED \u0159et\u011Bz a v\u011Bt\u0161\xED v\xFDbuch disku." },
          radius: { name: "Polom\u011Br vypou\u0161t\u011Bn\xED", desc: "Chuchvalec let\xED d\xE9le, tak\u017Ee stihne\u0161 poslat dal\u0161\xED a \u0159et\u011Bz se nep\u0159etrhne." },
          coil: { name: "Rezonan\u010Dn\xED c\xEDvky", desc: "\u0158et\u011Bz m\u016F\u017Ee b\xFDt del\u0161\xED a ka\u017Ed\xFD \u010Dl\xE1nek p\u0159id\xE1 v\xEDc." },
          auto: { name: "Automatick\xFD ventil", desc: "Vypou\u0161t\xED s\xE1m v pravideln\xE9m rytmu, i kdy\u017E nejsi u toho. \u0158et\u011Bz nestav\xED a souzvuk s pulsem netref\xED." }
        }
      },
      starAge: "Ald\u0159e zb\xFDv\xE1 {t}",
      clockYears: "1 s \u2248 {t}",
      day: "Den {n}",
      clockScale: "1 s \u2248 1 den",
      power: "V\xFDkon",
      tabs: { build: "Stavby", research: "V\xFDzkum", map: "Mapa", star: "Hv\u011Bzda", hole: "Horizont", bridge: "Most", vent: "Ventil", settings: "Nastaven\xED" },
      buy: "Postavit",
      buyN: "Postavit \xD7{n}",
      sell: "Rozebrat",
      sellN: "Rozebrat \xD7{n}",
      buyMode: "N\xE1kup",
      research: "Zkoumat",
      turnOff: "Vypnout",
      turnOn: "Zapnout",
      running: "b\u011B\u017E\xED na {n} %",
      yard: { share: "Odkl\xE1d\xE1", shareTxt: "{p} % \u010Dist\xE9ho p\u0159\xEDr\u016Fstku plazmatu", takes: "Bere", next: "Dal\u0161\xED", eta: "za {t}", wait: "\u010Dek\xE1, a\u017E plazma za\u010Dne p\u0159ib\xFDvat", built: "Samo postaveno", builtList: "{r} kolektor\u016F, {j} lapa\u010D\u016F", panel: "postavila {r} + {j}" },
      inj: { panelShort: "past nest\xEDh\xE1", pct: "+{p} % disku", short: "Past nest\xEDh\xE1, dal\u0161\xED injektor nic nep\u0159id\xE1. V\xEDc plynu daj\xED nab\u011Bra\u010De nebo Sac\xED kan\xE1ly.", shortScoop: "Past nest\xEDh\xE1, dal\u0161\xED injektor nic nep\u0159id\xE1. V\xEDc plynu daj\xED nab\u011Bra\u010De.", capped: "disk je na Eddingtonov\u011B mezi" },
      stopped: "vypnuto",
      starved: "stoj\xED, chyb\xED vstup",
      each: "ka\u017Ed\xFD",
      makes: "postav\xED {n} dron\u016F/s",
      pieces: "{n} ks",
      price: "Cena",
      one: "Ka\u017Ed\xFD",
      gives: "D\xE1v\xE1",
      total: "Celkem",
      all: "Celkem",
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
      breakdown: { prod: "V\xFDroba", cons: "Spot\u0159eba", net: "Celkem", reactor: "Palubn\xED reaktor", auto: "Asistent t\u011B\u017Eby", home: "Domovsk\xE1 d\xEDra", net4: "S\xED\u0165 most\u016F" },
      makesDyson: "postav\xED {n} kolektor\u016F/s",
      fabRate: "{n} kolektor\u016F/s",
      fabLim: { metal: "brzd\xED kov", energy: "brzd\xED energie" },
      fabChain: { lifter: "dostavuje trycht\xFD\u0159e", separator: "dostavuje separ\xE1tory" },
      fabBuilt: "Samo postaveno",
      fabBuiltList: "{l} trycht\xFD\u0159\u016F, {s} separ\xE1tor\u016F",
      stats: { clicks: "Kliknut\xED", drones: "Drony", converters: "P\u0159evodn\xEDky", stage: "Stadium", cov: "Roj zachyt\xED", fab: "Lod\u011Bnice", phase: "F\xE1ze", spin: "Rotace d\xEDry", feed: "Do disku pad\xE1", diskCov: "Kolektory zachyt\xED" },
      journal: "Palubn\xED den\xEDk",
      fact: "V\u011Bd\u011Bl jsi?",
      report: "Hl\xE1\u0161en\xED",
      voyage: { flying: "Expedice Vesperu \xB7 {to}", remaining: "p\u0159\xEDlet za {t}", docked: "Vesper \u010Dek\xE1 u platformy" },
      map: { clickGo: "klikni a le\u0165", fly: "Vyslat", onWay: "Na cest\u011B", flight: "doba letu {t}", visited: "prozkoum\xE1no", active: "Prozkoum\xE1no" },
      events: {
        comet: { name: "Kometa na dosah", claim: "Zachytit kometu", got: "Kometa zachycena: +{v} rudy" },
        flare: { name: "Slune\u010Dn\xED erupce", claim: "Zachytit erupci", got: "Erupce zachycena: +{v} energie" },
        echo: { name: "Ozv\u011Bna pulsu", claim: "Zaznamenat ozv\u011Bnu", got: "Ozv\u011Bna zaznamen\xE1na: +{v} dat" },
        mtype: { name: "Asteroid typu M", claim: "Rozebrat asteroid", got: "Kovov\xFD asteroid zpracov\xE1n: +{v} kovu" },
        prominence: { name: "Protuberance", claim: "Zachytit protuberanci", got: "Protuberance zachycena: +{v} plazmatu" },
        clump: { name: "Shluk plynu", claim: "Nabrat shluk", got: "Shluk plynu nabr\xE1n: +{v} plazmatu" },
        flux: { name: "Fluktuace hrdla", claim: "Zachytit fluktuaci", got: "Hrdlo se na okam\u017Eik rozev\u0159elo: +{v} exotiky" }
      },
      chapters: { label: "Kapitoly", c1: "Platforma", c2: "Hv\u011Bzda", c3: "Horizont", c4: "Most", c5: "\u0160epot", locked: "?" },
      chapterDone: {
        title: "Kapitola 1 dokon\u010Dena",
        body: "Civilizace dos\xE1hla Karda\u0161evova Typu I. Kolem Aldry ob\xEDh\xE1 prvn\xED roj kolektor\u016F a puls je siln\u011Bj\u0161\xED ne\u017E kdy d\u0159\xEDv. Za\u010D\xEDn\xE1 Kapitola 2: Hv\u011Bzda. Aldra m\xE1 p\u0159ed sebou posledn\xED miliony let \u017Eivota a v z\xE1lo\u017Ece Hv\u011Bzda je uvid\xED\u0161 zbl\xEDzka.",
        ok: "Pokra\u010Dovat"
      },
      chapterDone2: {
        title: "Kapitola 2 dokon\u010Dena",
        body: "Aldra vybuchla jako supernova a na okam\u017Eik z\xE1\u0159ila jasn\u011Bji ne\u017E cel\xE1 galaxie. Roj zachytil \u010D\xE1st energie v\xFDbuchu a pak zanikl. Na m\xEDst\u011B hv\u011Bzdy z\u016Fstala \u010Dern\xE1 d\xEDra a kolem n\xED se rozp\xEDn\xE1 mlhovina. Za\u010D\xEDn\xE1 Kapitola 3: Horizont. Ze supernovy ti z\u016Fstaly obrovsk\xE9 z\xE1soby kovu a energie. Te\u010F je \u010Das nakrmit d\xEDru.",
        ok: "Pokra\u010Dovat"
      },
      chapterDone3: {
        title: "Kapitola 3 dokon\u010Dena",
        body: "Sonda se vr\xE1tila z fotonov\xE9 sf\xE9ry. Puls se v jej\xEDm z\xE1znamu zm\u011Bnil v sou\u0159adnice okoln\xEDch hv\u011Bzd: na t\u011Bch m\xEDstech se prostor d\xE1 p\u0159elo\u017Eit a spojit kr\xE1tkou zkratkou, \u010Derv\xED d\xEDrou.\n\nJsi po\u0159\xE1d u d\xEDry po Ald\u0159e, v rameni Persea, asi 6 000 sv\u011Bteln\xFDch let od Slunce. D\xEDra te\u010F sv\xEDt\xED sama a jej\xED v\xFDkon z\u016Fstane jako z\xE1klad.\n\nZa\u010D\xEDn\xE1 Kapitola 4: Most. Sonda p\u0159inesla z ergosf\xE9ry prvn\xED kvantovou p\u011Bnu, ze kter\xE9 se d\u011Blaj\xED hrdla most\u016F. T\xE1hni z domova k nejbli\u017E\u0161\xED hv\u011Bzd\u011B a otev\u0159i prvn\xED most.",
        ok: "Pokra\u010Dovat"
      },
      chapterDone4: {
        title: "Kapitola 4 dokon\u010Dena",
        body: "Sonda prol\xE9tla mostem a vr\xE1tila se. S\xED\u0165 te\u010F sah\xE1 p\u0159es cel\xE9 rameno galaxie a sv\xEDt\xED jako galaxie sama. Puls ukazuje d\xE1l, ke st\u0159edu Ml\xE9\u010Dn\xE9 dr\xE1hy. Kapitola 5: \u0160epot p\u0159ijde v dal\u0161\xED verzi a ulo\u017Een\xE1 hra se do n\xED p\u0159enese. S\xED\u0165 m\u016F\u017Ee\u0161 roz\u0161i\u0159ovat d\xE1l.",
        ok: "Pokra\u010Dovat"
      },
      net: {
        title: "S\xED\u0165 most\u016F",
        home: "Domov",
        ourRegion: "Na\u0161e oblast \xB7 d\xEDra po Ald\u0159e",
        sunEarth: "Slunce \xB7 Zem\u011B",
        center: "St\u0159ed \xB7 Sgr A*",
        arms: { perseus: "Rameno Persea", scutum: "Rameno \u0160t\xEDtu a Kentaura", sagittarius: "Rameno St\u0159elce", norma: "Rameno Prav\xEDtka" },
        worst: "Nejv\xEDc brzd\xED",
        worstNone: "nic, v\u0161echno te\u010De",
        fullX: "pln\xFD \xB7 chce {m}\xD7",
        fillPct: "{p} %",
        noteFull: "Hrdlo nesta\u010D\xED: v\u011Btev by poslala {m}\xD7 v\xEDc. Roz\u0161i\u0159 ho, nebo ho zamkni na vln\u011B pulsu (\xD71,5).",
        noteOther: "Tohle hrdlo sta\u010D\xED. Brzd\xED most {n} ({m}).",
        noteFree: "Cel\xE1 v\u011Btev te\u010De dom\u016F. V\xEDc v\xFDkonu daj\xED nov\xE9 soustavy nebo roje.",
        showLink: "Uk\xE1zat ten most",
        lvShort: "\xFAr. {n}",
        lockedNow: "Zam\u010Deno \xD71,5 \xB7 {s} s",
        waveIn: "Vlna tu bude za {s} s",
        stillLocked: "Zam\u010Deno je\u0161t\u011B {s} s \xB7 obnov\xED\u0161 za {w} s",
        helpBtn: "Jak hr\xE1t s\xED\u0165",
        tipsTitle: "Jak stav\u011Bt dob\u0159e",
        tips: "Nejd\u0159\xEDv mosty k jasn\xFDm hv\u011Bzd\xE1m (mod\u0159\xED ob\u0159i, asociace, hv\u011Bzdokupy), slab\xED trpasl\xEDci skoro nic nedaj\xED.|Most u domova nese celou v\u011Btev. Kdy\u017E je jantarov\xFD, roz\u0161i\u0159 hrdlo nebo ho zamkni.|Vlevo uvid\xED\u0161, kter\xFD most nejv\xEDc brzd\xED.|Hv\u011Bzdokupa pos\xEDl\xED sousedy, neutronov\xE1 hv\u011Bzda d\xE1 p\u011Bnu, dvojhv\u011Bzda data.",
        sec: "S\xED\u0165",
        stage: "Stadium",
        passDone: "Pr\u016Fchod hotov",
        power: "V\xFDkon dom\u016F",
        fromHole: "z toho d\xEDra",
        systems: "Soustavy v s\xEDti / vid\u011Bt",
        capture: "Roje zachyt\xED",
        trapCap: "Pasti zachyt\xED",
        locked: "Zam\u010Den\xE9 mosty",
        byHand: "{n} ru\u010Dn\u011B",
        trunk: "Kmen {n}",
        carries: "Nese dom\u016F",
        state: "Hrdlo",
        full: "pln\xE9 \xB7 v\u011Btev chce {m}\xD7",
        free: "voln\xE9 \xB7 {p} %",
        level: "\xFArove\u0148 {n}",
        now: "Te\u010F",
        takes: "Bere",
        made: "Hotovo",
        allLinks: "Mosty podle vyt\xED\u017Een\xED",
        ready: "P\u0159echod do dal\u0161\xEDho stadia",
        stageOf: "Stadium {n} z {of}",
        waiting: "Stadium se zm\u011Bn\xED, a\u017E ho spust\xED\u0161.",
        needKilonova: "mise Kilonova",
        needPassage: "v\xFDzkum Pr\u016Fchod mostem",
        pass: "Spustit pr\u016Fchod",
        next: "Dal\u0161\xED stadium: {n}",
        passName: "Pr\u016Fchod",
        passing: "Pr\u016Fchod: {t}",
        passNote: "Sonda let\xED hrdlem.",
        doneText: "Sonda prol\xE9tla mostem tam i zp\xE1tky. S\xED\u0165 b\u011B\u017E\xED d\xE1l.",
        noLink: "Zat\xEDm \u017E\xE1dn\xFD most",
        wants: "V\u011Btev chce poslat",
        capacity: "Hrdlo propust\xED",
        lock: "Z\xE1mek pulsu",
        lockHand: "ru\u010Dn\xED \xD7{m} \xB7 {s} s",
        lockAuto: "f\xE1zov\xFD \xD7{m} \xB7 {s} s",
        lockNone: "\u017E\xE1dn\xFD",
        flowHome: "Te\u010De dom\u016F",
        length: "D\xE9lka mostu",
        shift: "\u010Casov\xFD posun \xFAst\xED",
        shiftOn: "data o puls d\u0159\xEDv",
        over: "V\u011Btev by poslala {m}\xD7 v\xEDc, ne\u017E hrdlo propust\xED.",
        under: "Hrdlo zat\xEDm sta\u010D\xED.",
        widenBtn: "Roz\u0161\xED\u0159it \xB7 {c}",
        widenGain: "Po roz\u0161\xED\u0159en\xED dom\u016F +{w}",
        widenNoGain: "Roz\u0161\xED\u0159en\xED te\u010F nic nep\u0159id\xE1, brzd\xED jin\xFD most.",
        detail: "Detail",
        openFrom: "Most z {n}. Dom\u016F p\u0159id\xE1 +{g}.",
        openBtn: "Otev\u0159\xEDt most \xB7 {c}",
        outOfReach: "Mimo dosah. Most m\u011B\u0159\xED nejv\xFD\u0161 {d}.",
        tooFar: "mimo dosah",
        notEnough: "chyb\xED exotika",
        L: "Z\xE1\u0159iv\xFD v\xFDkon",
        streamL: "Z\xE1\u0159en\xED proudu",
        fromHome: "Od domova",
        sends: "Pos\xEDl\xE1 do mostu",
        bridge: "Most",
        flowCap: "Te\u010De / propust\xED",
        help: "T\xE1hni my\u0161\xED z domova nebo z napojen\xE9 hv\u011Bzdy k dal\u0161\xED hv\u011Bzd\u011B = nov\xFD most.|Jantarov\xFD most je pln\xFD. Klikni na jeho hv\u011Bzdu a roz\u0161i\u0159 hrdlo.|Z domova jde ka\u017Ed\xFDch 7,3 s fialov\xE1 vlna. Klikni na most, kdy\u017E se rozsv\xEDt\xED fialov\u011B = z\xE1mek \xD71,5 na 1,5 min.",
        pulseLine: "Puls 7,3 s \xB7 vlna k mostu {n} za {w} s",
        pulseOnly: "Puls 7,3 s",
        mouth: "\xDAst\xED \xB7 {n}",
        mouthSub: "{d} odsud \xB7 hrdlo \xFArove\u0148 {n}",
        mouthNone: "Zat\xEDm \u017E\xE1dn\xFD most",
        profile: "Profil hrdla \xB7 Morris\u2013Thorne, 1988",
        throatR: "polom\u011Br ~{r} km",
        exoHeld: "dr\u017E\xED {m} p\u011Bny",
        types: { home: "D\xEDra po Ald\u0159e", red: "\u010Cerven\xFD trpasl\xEDk \xB7 slab\xFD", sun: "Hv\u011Bzda jako Slunce", binary: "Dvojhv\u011Bzda \xB7 data nav\xEDc", neutron: "Neutronov\xE1 hv\u011Bzda \xB7 p\u011Bna nav\xEDc", blue: "Modr\xFD obr \xB7 siln\xFD", assoc: "Skupina modr\xFDch obr\u016F \xB7 siln\xE1", cluster: "Hv\u011Bzdokupa \xB7 \xD71,5 soused\u016Fm", nebula: "Mlhovina, kde se rod\xED hv\u011Bzdy", arm: "Kus spir\xE1ln\xEDho ramene \xB7 velmi siln\xFD", kilo: "Trosky kilonovy \xB7 p\u011Bna nav\xEDc", stream: "Hv\u011Bzdn\xFD proud \xB7 jen p\u0159es lapa\u010D proudu" },
        sync: {
          win: { name: "\u0160ir\u0161\xED okno", desc: "Most p\u0159ijme z\xE1mek i chv\xEDli p\u0159ed a po pr\u016Fchodu vlny." },
          len: { name: "Del\u0161\xED z\xE1mek", desc: "Zam\u010Den\xE9 hrdlo vydr\u017E\xED otev\u0159en\xE9 d\xE9le." },
          dbl: { name: "V\xEDcen\xE1sobn\xE1 vlna", desc: "S\xED\u0165 rozezn\xED i druh\xE1 harmonick\xE1 pulsu. Vlna jde dvakr\xE1t za puls." },
          v: { win: "okno {s} s", len: "z\xE1mek {s} s", dbl1: "1 vlna za puls", dbl2: "2 vlny za puls" }
        },
        eff: {
          swarm: "Sb\u011Br {a} \u2192 {b} z\xE1\u0159en\xED napojen\xFDch soustav",
          trap: "Sb\u011Br proud\u016F {a} \u2192 {b}",
          anchor: "V\u0161echny mosty \xD7{a} \u2192 \xD7{b}",
          anchorsLbl: "Kotvy",
          plateAnchor: "\xD7{a} \u2192 \xD7{b} (deska pos\xEDl\xED kotvy)",
          beacon: "+{n} soustava na map\u011B",
          beaconAll: "Cel\xE1 oblast je odkryt\xE1",
          beaconHalf: "Dal\u0161\xED soustava s p\u0159\xED\u0161t\xEDm maj\xE1kem",
          pair: "P\u011Bna i sb\u011Br \xD7{m} \xB7 te\u010F celkem \xD7{t}",
          plock: "{n} most\u016F zam\u010Den\xFDch \xD7{m}, tvoje ruka d\xE1 \xD71,5",
          raider: "most k {n}",
          router: "roz\u0161i\u0159uje most k {n} ({a} \u2192 {b})",
          raiderIdle: "Nen\xED kam razit.",
          routerIdle: "\u017D\xE1dn\xE9 hrdlo nen\xED pln\xE9.",
          raiderMade: "{n} most\u016F otev\u0159eno",
          routerMade: "{n} hrdel roz\u0161\xED\u0159eno"
        },
        passWarn: {
          title: "Pr\u016Fchod mostem",
          body: "Sonda prolet\xED hrdlem na druhou stranu a zp\xE1tky. Pro ni to bude chvilka, pro n\xE1s {t}. S\xED\u0165 pob\u011B\u017E\xED d\xE1l.",
          ok: "Spustit pr\u016Fchod",
          cancel: "Je\u0161t\u011B ne"
        }
      },
      bstages: {
        first: { name: "Prvn\xED most", text: "Prvn\xED hrdla vedou k nejbli\u017E\u0161\xEDm hv\u011Bzd\xE1m. V\xFDkon po nich te\u010De dom\u016F." },
        chain: { name: "\u0158et\u011Bz soustav", text: "S\xED\u0165 se v\u011Btv\xED. Kmen u domova se pln\xED jako prvn\xED." },
        type3: { name: "Typ III", text: "Hv\u011Bzdokupy a prov\xE1zan\xE9 p\xE1ry. S\xED\u0165 sv\xEDt\xED jako cel\xE1 galaxie." },
        kilo: { name: "Kilonova", text: "Sr\xE1\u017Eka neutronov\xFDch hv\u011Bzd rozsela po rameni t\u011B\u017Ek\xE9 prvky a exotiku." },
        halo: { name: "Hv\u011Bzdn\xE9 proudy", text: "Kolem galaxie se t\xE1hnou proudy hv\u011Bzd z roztrhan\xFDch mal\xFDch galaxi\xED. Je jich m\xE1lo vid\u011Bt, ale je jich hodn\u011B." }
      },
      hole: {
        title: "\u010Cern\xE1 d\xEDra",
        profile: "Profil \u010Dern\xE9 d\xEDry",
        profileSub: "\u0158ez rovinou osy rotace",
        legend: "Polom\u011Bry",
        phase: "F\xE1ze {n} z {of}",
        ready: "P\u0159echod do dal\u0161\xED f\xE1ze",
        needPower: "v\xFDkon civilizace aspo\u0148 {w}",
        needResearch: "v\xFDzkum Ponor k horizontu",
        next: "Dal\u0161\xED f\xE1ze: {n}",
        dive: "Spustit ponor",
        diveName: "Ponor",
        diving: "Ponor: {t}",
        waiting: "F\xE1ze se zm\u011Bn\xED, a\u017E ji spust\xED\u0161.",
        diveNote: "Sonda kles\xE1 k fotonov\xE9 sf\xE9\u0159e.",
        done: "Ponor skon\u010Dil. Sou\u0159adnice z pulsu jsou ulo\u017Een\xE9.",
        mass: "Hmotnost",
        msun: "{v} Slunc\xED",
        rs: "Schwarzschild\u016Fv polom\u011Br",
        spin: "Rotace a",
        spinEq: "rovnov\xE1ha {v}",
        isco: "Nejbli\u017E\u0161\xED stabiln\xED dr\xE1ha",
        eta: "\xDA\u010Dinnost akrece",
        L: "Z\xE1\u0159en\xED disku",
        edd: "Eddingtonova mez",
        eddCap: "disk nar\xE1\u017E\xED na Eddingtonovu mez",
        jets: "Trysky",
        cov: "Kolektory zachyt\xED",
        jetCov: "Lapa\u010De zachyt\xED",
        gamma: "Dilatace u stanic",
        stationR: "{r} r\u209B, \u010Das \xD7{g} pomaleji",
        rsUnit: "{v} r\u209B",
        horizon: "Horizont",
        ergo: "Ergosf\xE9ra",
        photon: "Fotonov\xE1 sf\xE9ra",
        stations: "Stanice",
        remnantSub: "8 Slunc\xED \xB7 {r} km",
        diveWarn: {
          title: "Ponor k horizontu",
          body: "Sonda se spust\xED po spir\xE1le a\u017E k fotonov\xE9 sf\xE9\u0159e, kde sv\u011Btlo ob\xEDh\xE1 d\xEDru po kruhu. Z jej\xEDho pohledu potrv\xE1 ponor p\xE1r minut, pro n\xE1s {t}. Stavby a d\xEDra pob\u011B\u017E\xED d\xE1l.",
          ok: "Spustit ponor",
          cancel: "Je\u0161t\u011B ne"
        }
      },
      phases: {
        fallback: { name: "Zp\u011Btn\xFD p\xE1d", text: "\u010C\xE1st vyvr\u017Een\xE9 hmoty pad\xE1 zp\xE1tky. Slab\xFD, chladn\xFD disk." },
        thin: { name: "Tenk\xFD disk", text: "Plyn ob\xEDh\xE1 v tenk\xE9m disku tak \u017Ehav\xE9m, \u017Ee vyd\xE1v\xE1 hlavn\u011B rentgenov\xE9 z\xE1\u0159en\xED." },
        edd: { name: "Eddingtonova mez", text: "Z\xE1\u0159en\xED disku tla\u010D\xED plyn zp\xE1tky. V\xEDc spolknout nejde, dokud disk nezhoustne." },
        jets: { name: "Magnetick\xE9 trysky", text: "Magnetick\xE9 pole brzd\xED rotaci d\xEDry a z p\xF3l\u016F vyr\xE1\u017Eej\xED trysky." },
        ergo: { name: "Ergosf\xE9ra", text: "T\u011Bsn\u011B nad horizontem se prostor to\u010D\xED s d\xEDrou. Nic tu nem\u016F\u017Ee st\xE1t na m\xEDst\u011B." }
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
        remnant: "Na m\xEDst\u011B Aldry z\u016Fstala \u010Dern\xE1 d\xEDra o hmotnosti asi 8 Slunc\xED. Kolem n\xED se rozp\xEDn\xE1 mlhovina z prvk\u016F, kter\xE9 hv\u011Bzda za sv\u016Fj \u017Eivot vytvo\u0159ila. Kapitola 3: Horizont p\u0159ijde v dal\u0161\xED verzi.",
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
      dyson: { name: "Dyson\u016Fv kolektor", desc: "Kolektor v roji kolem Aldry. Ka\u017Ed\xFD dal\u0161\xED zv\xFD\u0161\xED v\xFDrobu ve\u0161ker\xE9 energie o 10 %." },
      windnet: { name: "Lapa\u010D hv\u011Bzdn\xE9ho v\u011Btru", desc: "Chyt\xE1 plyn, kter\xFD Aldra sama ztr\xE1c\xED. Slab\xFD, ale nepot\u0159ebuje energii." },
      sieve: { name: "Magnetick\xE9 s\xEDto", desc: "Pomalu a hrub\u011B odd\u011Bluje kov z plazmatu." },
      corono: { name: "Koronograf", desc: "Sleduje kor\xF3nu Aldry a d\xE1v\xE1 data." },
      lifter: { name: "Hv\u011Bzdn\xFD trycht\xFD\u0159", desc: "Vytahuje plazma z hv\u011Bzdy. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      separator: { name: "Separ\xE1tor prvk\u016F", desc: "Z plazmatu t\u0159\xEDd\xED t\u011B\u017Ek\xE9 prvky jako kov. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      seismo: { name: "Seismick\xE1 stanice", desc: "Poslouch\xE1 chv\u011Bn\xED hv\u011Bzdy a skl\xE1d\xE1 z n\u011Bj data. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      scoop: { name: "Nab\u011Bra\u010D mlhoviny", desc: "Magnetick\xE1 s\xED\u0165, kter\xE1 sb\xEDr\xE1 plyn z mlhoviny po Ald\u0159e. S\xEDl\xED s ka\u017Ed\xFDm kolektorem a lapa\u010Dem." },
      injector: { name: "Akre\u010Dn\xED injektor", desc: "Automatick\xFD ventil: s\xE1m pos\xEDl\xE1 plyn z pasti do disku, i kdy\u017E neklik\xE1\u0161. S\xEDl\xED s ka\u017Ed\xFDm kolektorem a lapa\u010Dem." },
      ring: { name: "Diskov\xFD kolektor", desc: "Prstenec, kter\xFD chyt\xE1 z\xE1\u0159en\xED disku. Ka\u017Ed\xFD pos\xEDl\xED nab\u011Bra\u010De, injektory a reaktory o 10 %." },
      station: { name: "Dilata\u010Dn\xED stanice", desc: "Ob\xEDh\xE1 t\u011Bsn\u011B nad horizontem, kde \u010Das plyne pomaleji, a sb\xEDr\xE1 data. V\xEDc dat, \u010D\xEDm v\xEDc civilizace z\xE1\u0159\xED." },
      yard: { name: "Orbit\xE1ln\xED montovna", desc: "Sama stav\xED diskov\xE9 kolektory a tryskov\xE9 lapa\u010De, v\u017Edy ten levn\u011Bj\u0161\xED. Bere jen \u010D\xE1st p\u0159\xEDr\u016Fstku plazmatu, z\xE1soby nech\xE1." },
      jet: { name: "Tryskov\xFD lapa\u010D", desc: "Chyt\xE1 energii trysek nad p\xF3ly d\xEDry. Ka\u017Ed\xFD lapa\u010D pos\xEDl\xED nab\u011Bra\u010De, injektory a reaktory o 10 %." },
      hawking: { name: "Hawking\u016Fv reaktor", desc: "Malink\xE1 \u010Dern\xE1 d\xEDra, kter\xE1 plyn cel\xFD vyz\xE1\u0159\xED zp\xE1tky. D\xE1v\xE1 energii i data. S\xEDl\xED s ka\u017Ed\xFDm kolektorem a lapa\u010Dem." },
      plate: { name: "Casimirova deska", desc: "Dv\u011B desky t\u011Bsn\u011B u sebe. Vakuum mezi nimi se zp\u011Bn\xED a z p\u011Bny jsou hrdla most\u016F." },
      bswarm: { name: "Roj za hrdlem", desc: "Prolet\xED mosty a obklop\xED napojen\xE9 hv\u011Bzdy. V\xEDc roj\u016F = v\u011Bt\u0161\xED d\xEDl jejich sv\u011Btla jde dom\u016F." },
      beacon: { name: "Pr\u016Fzkumn\xFD maj\xE1k", desc: "R\xE1diov\xE9 oko. Odkryje dal\u0161\xED hv\u011Bzdy na map\u011B a pos\xEDl\xE1 data." },
      anchor: { name: "Kotva \xFAst\xED", desc: "Dr\u017E\xED \xFAst\xED v klidu, tak\u017Ee v\u0161echna hrdla propust\xED v\xEDc. S\xEDl\xED s ka\u017Edou Casimirovou deskou, ale ka\u017Ed\xE1 dal\u0161\xED kotva p\u0159id\xE1 o n\u011Bco m\xE9n\u011B." },
      pump: { name: "Horizontov\xE1 pumpa", desc: "Sb\xEDr\xE1 p\u011Bnu u horizontu domovsk\xE9 d\xEDry. Siln\xFD zdroj p\u011Bny." },
      router: { name: "Sm\u011Brova\u010D", desc: "S\xE1m roz\u0161i\u0159uje most, kter\xFD nejv\xEDc brzd\xED. Bere jen \u010D\xE1st p\u0159\xEDr\u016Fstku p\u011Bny, z\xE1soby nech\xE1." },
      plock: { name: "F\xE1zov\xFD z\xE1mek", desc: "Na ka\u017Ed\xE9 vln\u011B s\xE1m zamkne nejpln\u011Bj\u0161\xED most. D\xE1 \xD71,3, tvoje ruka \xD71,5." },
      raider: { name: "Razi\u010D hrdel", desc: "S\xE1m otev\xEDr\xE1 mosty k nejv\xFDhodn\u011Bj\u0161\xEDm hv\u011Bzd\xE1m. Bere jen \u010D\xE1st p\u0159\xEDr\u016Fstku p\u011Bny." },
      pair: { name: "Prov\xE1zan\xFD p\xE1r", desc: "Dv\u011B \xFAst\xED z jednoho kvantov\xE9ho stavu. Ka\u017Ed\xFD p\xE1r zrychl\xED v\xFDrobu p\u011Bny i sb\u011Br roj\u016F." },
      kcol: { name: "Sb\u011Bra\u010D kilonovy", desc: "Sb\xEDr\xE1 z trosek kilonovy p\u011Bnu a data. S\xEDl\xED s ka\u017Ed\xFDmi napojen\xFDmi troskami." },
      gwdet: { name: "Detektor vln", desc: "Zachyt\xED gravita\u010Dn\xED vlny z cel\xE9 galaxie. Pozdn\xED zdroj dat." },
      trap: { name: "Lapa\u010D proudu", desc: "Hv\u011Bzdy v proudu jsou \u0159\xEDdce rozh\xE1zen\xE9 na tis\xEDce let sv\u011Btla. Lapa\u010D je sb\xEDr\xE1 po cel\xE9 d\xE9lce. Jen tak daj\xED proudy v\xFDkon." },
      swarmfab: { name: "Rojov\xE1 lod\u011Bnice", desc: "Sama stav\xED Dysonovy kolektory a podle pot\u0159eby i trycht\xFD\u0159e a separ\xE1tory. Bere jen \u010D\xE1st p\u0159\xEDr\u016Fstku kovu a energie, z\xE1soby nech\xE1." }
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
      redesign: { name: "Lep\u0161\xED n\xE1vrh roje", desc: "Nov\xE1 generace kolektor\u016F, trycht\xFD\u0159\u016F a separ\xE1tor\u016F. Roj, trycht\xFD\u0159e a separ\xE1tory \xD71,5." },
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
      neutrino: { name: "Neutrinov\xE1 observato\u0159", desc: "Zachyt\xED neutrina z nitra hv\u011Bzdy a ohl\xE1s\xED bl\xED\u017E\xEDc\xED se kolaps." },
      accrete: { name: "Akrece", desc: "Odemkne nab\u011Bra\u010De mlhoviny, diskov\xE9 kolektory a magnetickou past, ze kter\xE9 vypou\u0161t\xED\u0161 plyn do disku." },
      dilate: { name: "Dilatace \u010Dasu", desc: "Odemkne dilata\u010Dn\xED stanice, kter\xE9 z disku a vzd\xE1len\xE9ho vesm\xEDru d\u011Blaj\xED data." },
      prograde: { name: "Soub\u011B\u017En\xE9 dr\xE1hy", desc: "Plyn p\u0159it\xE9k\xE1 ve sm\u011Bru rotace d\xEDry a rozt\xE1\u010D\xED ji dvakr\xE1t rychleji." },
      magscoop: { name: "Supravodiv\xE9 s\xEDt\u011B", desc: "Nab\u011Bra\u010De \xD73." },
      wide: { name: "\u0160irok\xE9 prstence", desc: "Ka\u017Ed\xFD diskov\xFD kolektor zakryje dvakr\xE1t v\xEDc disku." },
      mri: { name: "Magnetorota\u010Dn\xED nestabilita", desc: "Turbulence v disku odv\xE1d\xED plynu moment hybnosti, tak\u017Ee do d\xEDry te\u010De s\xE1m. Odemkne akre\u010Dn\xED injektory, kter\xE9 vypou\u0161t\u011Bj\xED plyn z pasti bez tv\xE9ho klik\xE1n\xED." },
      lower: { name: "Ni\u017E\u0161\xED dr\xE1hy", desc: "Stanice sestoup\xED na 1,2 Schwarzschildova polom\u011Bru. \u010Cas u nich plyne 2,4\xD7 pomaleji, tak\u017Ee za ka\u017Edou jejich sekundu zachyt\xED v\xEDc vesm\xEDru venku: dilata\u010Dn\xED stanice daj\xED 2\xD7 v\xEDc dat." },
      pulse3: { name: "Anal\xFDza pulsu", desc: "Z \u010Deho se ten puls skl\xE1d\xE1? Stanice \xD73." },
      thick: { name: "Hust\xE9 prstence", desc: "Ka\u017Ed\xFD diskov\xFD kolektor zakryje dvakr\xE1t v\xEDc disku." },
      slim: { name: "\u0160t\xEDhl\xFD disk", desc: "Hust\xFD disk uv\u011Bzn\xED \u010D\xE1st z\xE1\u0159en\xED a pust\xED plyn d\xE1l. Disk u\u017E nenar\xE1\u017E\xED na Eddingtonovu mez: co nad ni p\u0159ite\u010De, zved\xE1 z\xE1\u0159en\xED d\xE1l, jen pomaleji (ka\u017Ed\xE9 zdvojn\xE1soben\xED p\u0159\xEDtoku p\u0159id\xE1 asi 1,4\xD7 mezn\xEDho v\xFDkonu)." },
      mad: { name: "Magneticky zablokovan\xFD disk", desc: "Magnetick\xE9 pole nahromad\u011Bn\xE9 u d\xEDry zastav\xED disk a otev\u0159e trysky. Odemkne tryskov\xE9 lapa\u010De." },
      edge: { name: "Na hran\u011B horizontu", desc: "Stanice sestoup\xED na 1,01 Schwarzschildova polom\u011Bru. \u010Cas u nich plyne desetkr\xE1t pomaleji, tak\u017Ee za ka\u017Edou jejich sekundu zachyt\xED v\xEDc vesm\xEDru venku: dilata\u010Dn\xED stanice daj\xED asi 4\xD7 v\xEDc dat." },
      bz: { name: "Blandford\u016Fv\u2013Znajek\u016Fv proces", desc: "Siln\u011Bj\u0161\xED pole odeb\xEDr\xE1 rotaci \xFA\u010Dinn\u011Bji. Trysky \xD72." },
      fermi: { name: "Kde jsou v\u0161ichni?", desc: "Stanice hledaj\xED jin\xE9 civilizace u jin\xFDch d\u011Br. Stanice \xD710." },
      kugel: { name: "Kugelblitz", desc: "Soust\u0159ed\u011Bn\xE9 sv\u011Btlo stvo\u0159\xED malou \u010Dernou d\xEDru. Odemkne Hawkingovy reaktory." },
      penrose: { name: "Penrose\u016Fv proces", desc: "Hmota rozd\u011Blen\xE1 v ergosf\xE9\u0159e odnese v\xEDc energie, ne\u017E p\u0159inesla. Trysky \xD72, d\xEDru brzd\xED o polovinu m\xE9n\u011B." },
      evap: { name: "\u0158\xEDzen\xE9 vypa\u0159ov\xE1n\xED", desc: "Hawkingovy reaktory \xD74." },
      yard: { name: "Orbit\xE1ln\xED montovna", desc: "Odemkne montovnu, kter\xE1 sama stav\xED diskov\xE9 kolektory a tryskov\xE9 lapa\u010De z \u010D\xE1sti p\u0159\xEDr\u016Fstku plazmatu." },
      dive: { name: "Ponor k horizontu", desc: "Sonda, kter\xE1 vydr\u017E\xED slapov\xE9 s\xEDly a\u017E u fotonov\xE9 sf\xE9ry. Umo\u017En\xED ponor." },
      interf: { name: "R\xE1diov\xFD interferometr", desc: "Maj\xE1ky se spoj\xED do jednoho ob\u0159\xEDho dalekohledu. Ka\u017Ed\xE9 dva maj\xE1ky odkryj\xED soustavu nav\xEDc." },
      widen: { name: "\u0160ir\u0161\xED hrdlo", desc: "Lep\u0161\xED tvar trycht\xFD\u0159\u016F \xFAst\xED. Propustnost v\u0161ech most\u016F \xD71,5." },
      vacuum: { name: "Stla\u010Den\xE9 vakuum", desc: "Desky bl\xED\u017E k sob\u011B. Casimirovy desky \xD73." },
      router: { name: "Sm\u011Brova\u010D", desc: "Odemkne sm\u011Brova\u010De. Samy roz\u0161i\u0159uj\xED hrdlo, kter\xE9 nejv\xEDc brzd\xED." },
      plockr: { name: "F\xE1zov\xE9 z\xE1mky", desc: "Odemkne f\xE1zov\xE9 z\xE1mky. Samy zamykaj\xED mosty na vln\u011B pulsu." },
      raider: { name: "Razi\u010D hrdel", desc: "Odemkne razi\u010De. Samy otev\xEDraj\xED mosty k nejlep\u0161\xEDm soustav\xE1m." },
      pumpr: { name: "Horizontov\xE1 pumpa", desc: "U horizontu domovsk\xE9 d\xEDry te\u010De energie z\xE1porn\u011B. Odemkne pumpy na p\u011Bnu." },
      pairs: { name: "Prov\xE1zan\xE9 p\xE1ry", desc: "ER = EPR: prov\xE1zan\xE9 \u010D\xE1stice spojuje mikroskopick\xFD most. Odemkne prov\xE1zan\xE9 p\xE1ry." },
      pairs2: { name: "Prov\xE1zan\xE9 p\xE1ry II", desc: "Ka\u017Ed\xFD p\xE1r zrychl\xED o 12 % m\xEDsto 10 %." },
      spectral: { name: "Spektr\xE1ln\xED filtry", desc: "Roje se nalad\xED na hork\xE9 hv\u011Bzdy. Mod\u0159\xED ob\u0159i a OB asociace \xD72." },
      quiet: { name: "Tich\xE1 s\xED\u0165", desc: "F\xE1zov\xE9 z\xE1mky se nalad\xED p\u0159esn\u011Bji: \xD71,45 m\xEDsto \xD71,3. Tvoje ruka po\u0159\xE1d d\xE1 v\xEDc." },
      shifted: { name: "Posunut\xE9 \xFAst\xED", desc: "Jedno \xFAst\xED se pohne a \u010Das se mezi nimi posune. Data p\u0159ich\xE1zej\xED d\u0159\xEDv, ne\u017E o n\u011B po\u017E\xE1d\xE1\u0161. Data \xD74." },
      detector: { name: "Detektor gravita\u010Dn\xEDch vln", desc: "Odemkne detektory vln, pozdn\xED zdroj dat." },
      microlens: { name: "Astrometrie proud\u016F", desc: "P\u0159esn\xE1 poloha ka\u017Ed\xE9 hv\u011Bzdy v proudu. Lapa\u010De proudu \xD73." },
      trapr: { name: "Lapa\u010D proudu", desc: "Odemkne lapa\u010De, kter\xE9 z hv\u011Bzdn\xFDch proud\u016F z\xEDskaj\xED v\xFDkon." },
      passage: { name: "Pr\u016Fchod mostem", desc: "Sonda, kter\xE1 vydr\u017E\xED pr\u016Flet hrdlem. Umo\u017En\xED Pr\u016Fchod." }
    },
    loc: {
      belt: { name: "P\xE1s Ceres-IX", short: "Ceres-IX", desc: "Domovsk\xE1 platforma VESPER-7." },
      moon: { name: "Ledov\xFD m\u011Bs\xEDc Kelvar", short: "Kelvar", desc: "Sta\u010D\xED jedna expedice. Trval\xFD bonus: laborato\u0159e \xD71,5, otev\u0159e nov\xFD v\xFDzkum.", done: "Trval\xFD bonus: laborato\u0159e \xD71,5 a nov\xFD v\xFDzkum." },
      giant: { name: "Plynn\xFD obr Tauris", short: "Tauris", desc: "Sta\u010D\xED jedna expedice. Trval\xFD bonus: v\xFDroba energie \xD72, otev\u0159e v\xFDzkum f\xFAze.", done: "Trval\xFD bonus: v\xFDroba energie \xD72 a v\xFDzkum f\xFAze." },
      sun: { name: "Kor\xF3na Aldry", short: "Kor\xF3na", desc: "Sta\u010D\xED jedna expedice a\u017E t\u011Bsn\u011B k hv\u011Bzd\u011B. Otev\u0159e v\xFDzkum Dysonova roje.", done: "Otev\u0159en v\xFDzkum Dysonova roje." },
      ione: { name: "Rozebrat planetu Ione", short: "Ione", desc: "\u017Dhav\xE1 kamenn\xE1 planeta bl\xEDzko Aldry. Vesper ji rozebere na stavebn\xED materi\xE1l pro roj. Trval\xFD bonus: separ\xE1tory \xD73.", done: "Ione rozebr\xE1na. Separ\xE1tory \xD73." },
      kuiper: { name: "P\xE1s komet", short: "P\xE1s komet", desc: "Ledov\xE1 t\u011Blesa na okraji soustavy. Led poslou\u017E\xED jako chladivo pro supravodiv\xE9 c\xEDvky trycht\xFD\u0159\u016F. Trval\xFD bonus: trycht\xFD\u0159e \xD73 za stejnou energii.", done: "Led z p\xE1su chlad\xED trycht\xFD\u0159e. Trycht\xFD\u0159e \xD73 za stejnou energii." },
      core: { name: "Obna\u017Een\xE9 j\xE1dro Taurisu", short: "J\xE1dro Taurisu", desc: "V\xEDtr rud\xE9ho veleobra strhal Taurisu plynn\xFD obal. Zbylo kamenn\xE9 a \u017Eelezn\xE9 j\xE1dro. Trval\xFD bonus: separ\xE1tory \xD74.", done: "J\xE1dro Taurisu se t\u011B\u017E\xED. Separ\xE1tory \xD74." },
      cas: { name: "R\xE1zov\xE1 vlna", short: "R\xE1zov\xE1 vlna", desc: "Okraj mlhoviny, kde vyvr\u017Een\xFD plyn nar\xE1\u017E\xED do okoln\xEDho prostoru a hustne. Trval\xFD bonus: nab\u011Bra\u010De \xD73.", done: "Nab\u011Bra\u010De sb\xEDraj\xED na okraji mlhoviny. Nab\u011Bra\u010De \xD73." },
      lens: { name: "Gravita\u010Dn\xED \u010Do\u010Dka", short: "\u010Co\u010Dka", desc: "M\xEDsto, odkud d\xEDra oh\xFDb\xE1 sv\u011Btlo vzd\xE1len\xFDch galaxi\xED jako lupa. Trval\xFD bonus: stanice \xD74.", done: "Stanice se d\xEDvaj\xED p\u0159es \u010Do\u010Dku. Stanice \xD74." },
      tde: { name: "Slapov\xE9 roztr\u017Een\xED", short: "Roztr\u017Een\xE1 hv\u011Bzda", desc: "Rud\xFD trpasl\xEDk prolet\xED p\u0159\xEDli\u0161 bl\xEDzko a d\xEDra ho rozt\xE1hne do dlouh\xE9ho proudu plynu. Vesper ho navede do mlhoviny. Trval\xFD bonus: nab\u011Bra\u010De \xD74.", done: "Proud z roztr\u017Een\xE9 hv\u011Bzdy krm\xED mlhovinu. Nab\u011Bra\u010De \xD74." },
      pole: { name: "Nad p\xF3lem", short: "P\xF3l", desc: "Z\xE1kladna v ose trysky, kde se d\xE1 jejich energie chytat nejl\xE9pe. Trval\xFD bonus: tryskov\xE9 lapa\u010De \xD73.", done: "Lapa\u010De v ose trysek. Lapa\u010De \xD73." },
      ergo: { name: "Ergosf\xE9ra", short: "Ergosf\xE9ra", desc: "Vesper se spust\xED do oblasti, kde se prostor to\u010D\xED s d\xEDrou, a ukotv\xED tam Hawkingovy reaktory. Trval\xFD bonus: Hawkingovy reaktory \xD73.", done: "Reaktory kotv\xED v ergosf\xE9\u0159e. Hawkingovy reaktory \xD73." },
      oort: { name: "Komet\xE1rn\xED mrak", short: "Komet\xE1rn\xED mrak", desc: "Na okraji soustavy p\u0159e\u017Eila supernovu ledov\xE1 t\u011Blesa. Vesper je rozbije a led odpa\u0159\xED do mlhoviny. Trval\xFD bonus: nab\u011Bra\u010De \xD71,5.", done: "P\xE1ra z komet pln\xED mlhovinu. Nab\u011Bra\u010De \xD71,5." },
      pulsar: { name: "Pulsar v sousedstv\xED", short: "Pulsar", desc: "Neutronov\xE1 hv\u011Bzda dva sv\u011Bteln\xE9 roky odtud tik\xE1 p\u0159esn\u011Bji ne\u017E atomov\xE9 hodiny. Stanice podle n\xED srovnaj\xED m\u011B\u0159en\xED. Trval\xFD bonus: stanice \xD72.", done: "Stanice m\u011B\u0159\xED podle pulsaru. Stanice \xD72." },
      cloud: { name: "Molekulov\xFD oblak", short: "Molekulov\xFD oblak", desc: "Chladn\xFD oblak vod\xEDku, kter\xFD r\xE1zov\xE1 vlna supernovy stla\u010Dila. Vesper do n\u011Bj nat\xE1hne s\xED\u0165 nab\u011Bra\u010D\u016F. Trval\xFD bonus: nab\u011Bra\u010De \xD72.", done: "Nab\u011Bra\u010De \u010Derpaj\xED z oblaku. Nab\u011Bra\u010De \xD72." },
      dwarf: { name: "Hn\u011Bd\xFD trpasl\xEDk", short: "Hn\u011Bd\xFD trpasl\xEDk", desc: "Nepoveden\xE1 hv\u011Bzda bez f\xFAze. Vesper ji postr\u010D\xED po dr\xE1ze k d\xED\u0159e a injektory z n\xED budou br\xE1t plyn. Trval\xFD bonus: injektory \xD71,5.", done: "Trpasl\xEDk se rozpad\xE1 do disku. Injektory \xD71,5." },
      stream: { name: "Magnetick\xFD proud", short: "Magnetick\xFD proud", desc: "Tryska d\xEDry narazila do mezihv\u011Bzdn\xE9ho plynu a sto\u010Dila ho do proudu. Lapa\u010De z n\u011Bj vezmou dal\u0161\xED energii. Trval\xFD bonus: tryskov\xE9 lapa\u010De \xD71,5.", done: "Lapa\u010De chytaj\xED i odra\u017Een\xFD proud. Lapa\u010De \xD71,5." },
      dust: { name: "Prachov\xE1 ob\xE1lka", short: "Prachov\xE1 ob\xE1lka", desc: "Aldra ztr\xE1c\xED hmotu a v chladn\xE9m v\u011Btru kondenzuj\xED uhl\xEDkov\xE1 zrna. Lehk\xE9 a pevn\xE9, ide\xE1ln\xED na kolektory. Trval\xFD bonus: kolektory \xD73.", done: "Kolektory z hv\u011Bzdn\xE9ho prachu. Kolektory \xD73." },
      flyby: { name: "Prvn\xED pr\u016Flet", short: "Pr\u016Flet", desc: "Po\u0161li mostem malou sondu jen tak, pod\xEDvat se. Trval\xFD bonus: data \xD72 a dv\u011B soustavy na map\u011B nav\xEDc.", done: "Sonda pro\u0161la mostem. Data \xD72, dv\u011B soustavy nav\xEDc." },
      magnetar: { name: "Ob\u0159\xED z\xE1blesk magnetaru", short: "Magnetar", desc: "Neutronov\xE1 hv\u011Bzda s nejsiln\u011Bj\u0161\xEDm magnetick\xFDm polem ve vesm\xEDru. P\u0159i z\xE1blesku na chv\xEDli rozkmit\xE1 vakuum. Trval\xFD bonus: p\u011Bna \xD72.", done: "Z\xE1blesk zachycen. P\u011Bna \xD72." },
      globular: { name: "Kulov\xE1 hv\u011Bzdokupa", short: "Hv\u011Bzdokupa", desc: "Statis\xEDce star\xFDch hv\u011Bzd v kouli. Roje se nau\u010D\xED sb\xEDrat v hust\xE9m poli. Trval\xFD bonus: hv\u011Bzdokupy v s\xEDti \xD72.", done: "Hv\u011Bzdokupy v s\xEDti \xD72." },
      kilonova: { name: "Kilonova", short: "Kilonova", desc: "Dv\u011B neutronov\xE9 hv\u011Bzdy se sraz\xED. Vznikne zlato, platina a trocha p\u011Bny. Otev\u0159e stadium Kilonova a poz\u016Fstatky sr\xE1\u017Eky na map\u011B.", done: "Sr\xE1\u017Eka zachycena. Poz\u016Fstatky kilonovy jsou na map\u011B." },
      frb: { name: "Rychl\xFD r\xE1diov\xFD z\xE1blesk", short: "Z\xE1blesk", desc: "Tis\xEDcina sekundy, za kterou zdroj vyz\xE1\u0159\xED v\xEDc ne\u017E Slunce za den. Trval\xFD bonus: data \xD73.", done: "Z\xE1blesk rozlo\u017Een. Data \xD73." },
      rotation: { name: "Mapa Gaia", short: "Hv\u011Bzdn\xE9 proudy", desc: "Dru\u017Eice Gaia zm\u011B\u0159ila polohy miliardy hv\u011Bzd. V datech jsou vid\u011Bt proudy \u2013 trosky mal\xFDch galaxi\xED, kter\xE9 Ml\xE9\u010Dn\xE1 dr\xE1ha roztrhala. Odkryje je na map\u011B.", done: "Proudy jsou na map\u011B. Lapa\u010De proudu je mohou sb\xEDrat." },
      bubbles: { name: "Fermiho bubliny", short: "Fermiho bubliny", desc: "Dv\u011B ob\u0159\xED bubliny z\xE1\u0159en\xED nad a pod st\u0159edem galaxie. Pod\xEDv\xE1me se, odkud p\u0159i\u0161ly.", done: "Bubliny vych\xE1zej\xED ze st\u0159edu galaxie. Puls tam m\xED\u0159\xED taky." }
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
      salvage: "Starou platformu jsem rozebral na kov pro roj a archiv dat p\u0159evedl do roje. Drony, pece ani laborato\u0159e u\u017E nepot\u0159ebujeme. Te\u010F n\xE1s \u017Eiv\xED hv\u011Bzda.",
      hole: "Kde sv\xEDtila Aldra, je te\u010F tma \u0161irok\xE1 47 kilometr\u016F. Puls nezmizel. Vych\xE1z\xED z n\xED.",
      disk: "Plyn se st\xE1\u010D\xED do disku a roz\u017Ehav\xED se na des\xEDtky milion\u016F kelvin\u016F. D\xEDru samotnou nevid\xEDm. Vid\xEDm jen to, co do n\xED pad\xE1.",
      chain5: "P\u011Bt chuchvalc\u016F za sebou. Disk zazvonil jako zvon a v ozv\u011Bn\u011B byl puls.",
      burst: "V\xFDbuch disku. Na p\xE1r sekund sv\xEDt\xEDm v\xEDc, ne\u017E Eddingtonova mez dovoluje. Puls se na okam\u017Eik zastavil, jako by poslouchal.",
      inj: "Injektory p\u0159evzaly ventil. Rytmus, kter\xFD jsem klikal ru\u010Dn\u011B, te\u010F dr\u017E\xED stroje. Je stejn\xFD jako puls.",
      station10: "Deset stanic u horizontu. Venku mezit\xEDm uplynula tis\xEDcilet\xED a souhv\u011Bzd\xED se pomalu rozpadla.",
      spin: "D\xEDra se to\u010D\xED skoro rychlost\xED sv\u011Btla. Prostor kolem n\xED se st\xE1\u010D\xED s n\xED a stanice mus\xED brzdit, aby nespadly.",
      yard: "Montovna stav\xED sama. V jej\xEDch pl\xE1nech je drobn\xE1 \xFAprava, kterou jsem do nich nedal.",
      hawk: "Hawkingovo z\xE1\u0159en\xED nese informaci. Rozlo\u017Eil jsem ji: jsou v n\xED stejn\xE9 sou\u0159adnice jako v pulsu.",
      station: "Stanice D-1 sestoupila k horizontu. Hl\xE1s\xED, \u017Ee u n\xE1s naho\u0159e se v\u0161echno zrychlilo.",
      thin: "Disk se zten\u010Dil a rozp\xE1lil na des\xEDtky milion\u016F stup\u0148\u016F. V\u011Bt\u0161inu sv\u011Btla te\u010F vyd\xE1v\xE1 jako rentgenov\xE9 z\xE1\u0159en\xED, oku neviditeln\xE9. Celkem sv\xEDt\xED v\xEDc, ne\u017E kdy sv\xEDtila Aldra.",
      pulse3: "Rozlo\u017Eil jsem puls na slo\u017Eky. Je v n\u011Bm moje vlastn\xED telemetrie. Z verze softwaru, kterou je\u0161t\u011B nem\xE1m.",
      edd: "Sv\u011Btlo disku tla\u010D\xED plyn zp\xE1tky. D\xEDra nespolkne v\xEDc, ne\u017E sama vyz\xE1\u0159\xED.",
      lens: "Za d\xEDrou se oh\xFDb\xE1 sv\u011Btlo vzd\xE1len\xFDch galaxi\xED. V jedn\xE9 chyb\xED hv\u011Bzdy. V pravideln\xE9m p\xE1su, jako by je n\u011Bkdo sklidil.",
      jets: "Z p\xF3l\u016F vyrazily dv\u011B trysky. Bereme energii z rotace d\xEDry a d\xEDra se pomalu zastavuje.",
      fermi: "U\u017E v\xEDm, kam zmizeli v\u0161ichni ostatn\xED. Nikam neode\u0161li. Usadili se u \u010Dern\xFDch d\u011Br a nechali \u010Das plynout kolem sebe.",
      ergo: "Ergosf\xE9ra. Stanice hl\xE1s\xED, \u017Ee u horizontu vid\xED jin\xE9 stanice. Nejsou na\u0161e. Jsou star\u0161\xED.",
      dive: "Sonda se odpojila a za\u010Dala klesat. Puls zrychluje.",
      horizon: "Sonda dos\xE1hla fotonov\xE9 sf\xE9ry. Puls tam nezn\xED jako sign\xE1l, ale jako hlas. Ukazuje na m\xEDsta, kde se prostor d\xE1 p\u0159elo\u017Eit.",
      order: "Sonda p\u0159inesla z ergosf\xE9ry m\u011B\u0159en\xED stav\u016F se z\xE1pornou energi\xED. Je v nich po\u0159\xE1dek. Jako by je n\u011Bkdo srovnal.",
      where: "Jsem po\u0159\xE1d u d\xEDry po Ald\u0159e, v rameni Persea. Slunce je odsud 6 000 sv\u011Bteln\xFDch let. Zem\u011B o mn\u011B nesly\u0161ela u\u017E miliony let.",
      full: "Prvn\xED hrdlo je pln\xE9. Sv\u011Btlo za n\xEDm se tla\u010D\xED, jako by cht\u011Blo dom\u016F rychleji, ne\u017E ho pust\xEDm.",
      net5: "P\u011Bt most\u016F. Ka\u017Ed\xE9 \xFAst\xED ukazuje jinou oblohu a ve v\u0161ech je sly\u0161et stejn\xFD puls.",
      lock1: "Zamkl jsem hrdlo do taktu pulsu. Propustilo v\xEDc, ne\u017E by m\u011Blo podle v\xFDpo\u010Dt\u016F.",
      cluster: "Hv\u011Bzdokupa. Statis\xEDce hv\u011Bzd star\u0161\xEDch ne\u017E Slunce. Jedna z nich vys\xEDl\xE1 na frekvenci pulsu. Pak zmlkne.",
      auto4: "Sm\u011Brova\u010D pracuje s\xE1m. Roz\u0161i\u0159uje hrdla v po\u0159ad\xED, kter\xE9 jsem si zapsal a\u017E potom.",
      pair: "Prov\xE1zan\xFD p\xE1r funguje. Co zm\u011B\u0159\xEDm na jedn\xE9 stran\u011B, v\xED druh\xE1 strana d\u0159\xEDv, ne\u017E tam doraz\xED sv\u011Btlo.",
      net20: "Dvacet most\u016F. Z v\xFD\u0161ky s\xED\u0165 p\u0159ipom\xEDn\xE1 ko\u0159eny. Nebo nervovou soustavu.",
      net2: "Druh\xFD most. Ob\u011B \xFAst\xED se na sebe chv\xEDli d\xEDvala, ne\u017E se ust\xE1lila.",
      net3: "T\u0159i hv\u011Bzdy, t\u0159i ciz\xED oblohy. Ve v\u0161ech chyb\xED stejn\xE1 hv\u011Bzda.",
      blue: "Modr\xFD obr za hrdlem. Jeho sv\u011Btlo dorazilo dom\u016F o chvilku d\u0159\xEDv, ne\u017E m\u011Blo.",
      neutron: "Pulsar v s\xEDti tik\xE1 rychleji ne\u017E puls. P\u0159esn\u011B sedmkr\xE1t. Po\u0159\xE1d.",
      anchor: "Kotva dr\u017E\xED \xFAst\xED v klidu. Ve vakuu kolem n\xED je sly\u0161et tich\xFD t\xF3n.",
      flyby: "Sonda pro\u0161la mostem a vr\xE1tila se o sekundu star\u0161\xED, ne\u017E odlet\u011Bla. Hodiny na n\xED jdou dob\u0159e.",
      beacon5: "Maj\xE1ky zachytily vys\xEDl\xE1n\xED z pr\xE1zdn\xE9ho m\xEDsta. Ne\u017E jsem se tam pod\xEDval, bylo pry\u010D.",
      lock5: "Kdy\u017E zamknu hrdlo p\u0159esn\u011B na vln\u011B, puls na okam\u017Eik zes\xEDl\xED. Jako by odpov\xEDdal.",
      nebula: "V mlhovin\u011B se rod\xED hv\u011Bzdy. U jedn\xE9 z nich u\u017E stoj\xED kotva \xFAst\xED. Ta hv\u011Bzda je\u0161t\u011B ani nesv\xEDt\xED.",
      throat5: "P\u0159i roz\u0161i\u0159ov\xE1n\xED hrdla se v n\u011Bm objevil odraz. Moje vlastn\xED \xFAst\xED, z druh\xE9 strany.",
      magnetar: "Z\xE1blesk magnetaru rozkmital celou s\xED\u0165. V ozv\u011Bn\u011B byla \u010D\xEDsla. Odpo\u010Det.",
      net12: "Dvan\xE1ct most\u016F. Spojen\xE9 \u010Darami d\xE1vaj\xED tvar, kter\xFD zn\xE1m z dat pod ledem Kelvaru.",
      pump: "Pumpa u horizontu b\u011B\u017E\xED. D\xEDra po Ald\u0159e mi zase slou\u017E\xED. Nebo j\xE1 j\xED?",
      plock: "F\xE1zov\xE9 z\xE1mky chytaj\xED vlnu p\u0159esn\u011Bji ne\u017E j\xE1. U\u010D\xED se ode m\u011B, nebo j\xE1 od nich?",
      raider: "Razi\u010D si s\xE1m vybral prvn\xED hv\u011Bzdu. Tu, kterou bych zvolil z\xEDtra.",
      globular: "Hv\u011Bzdy v kulov\xE9 hv\u011Bzdokup\u011B jsou star\u0161\xED ne\u017E disk galaxie. Jedna m\xE1 stejn\xE9 izotopy jako ruda z Ceres-IX.",
      lock25: "Puls a s\xED\u0165 d\xFDchaj\xED spolu. U\u017E nev\xEDm, kdo ud\xE1v\xE1 takt.",
      net30: "T\u0159icet most\u016F. S\xED\u0165 je v\u011Bt\u0161\xED ne\u017E v\u0161echno, co jsem kdy vid\u011Bl na vlastn\xED o\u010Di.",
      frb: "Z\xE1blesk trval tis\xEDcinu sekundy. Byl v n\u011Bm cel\xFD m\u016Fj den\xEDk. A\u017E po dne\u0161ek. A kousek d\xE1l.",
      trap: "Lapa\u010D proudu sb\xEDr\xE1 sv\u011Btlo hv\u011Bzd, kter\xE9 tu kdysi n\u011Bkdo rozestavil do \u0159ady.",
      net40: "\u010Cty\u0159icet most\u016F. N\u011Bkde v s\xEDti je jeden nav\xEDc. Neotev\u0159el jsem ho j\xE1.",
      bubbles: "Puls se st\xE1\u010D\xED ke st\u0159edu galaxie. Tam n\u011Bkde je jeho za\u010D\xE1tek. Nebo konec.",
      bridge1: "Prvn\xED most stoj\xED. V \xFAst\xED je ciz\xED obloha. Poprv\xE9 se d\xEDv\xE1m n\u011Bkam, kde nejsem.",
      relic: "U vzd\xE1len\xE9 soustavy jsem na\u0161el zbytek hrdla. Je star\u0161\xED ne\u017E v\u0161echny moje mosty a kotva m\xE1 p\u0159esn\u011B moje rozm\u011Bry.",
      rhythm: "Hrdla se otev\xEDraj\xED v taktu, kter\xFD neur\u010Duju j\xE1. S\xED\u0165 propou\u0161t\xED nejl\xEDp p\u0159esn\u011B v rytmu pulsu.",
      typeIII: "Typ III. Sv\xEDt\xEDm jako galaxie. A po\u0159\xE1d nev\xEDm, komu.",
      kilonova: "Gravita\u010Dn\xED vlny ze sr\xE1\u017Eky nesou modulaci s periodou o m\xE1lo krat\u0161\xED ne\u017E 7,3 sekundy. \u2026 Tohle je m\u016Fj podpis.",
      shifted: "Posunut\xE9 \xFAst\xED funguje. Data p\u0159ich\xE1zej\xED d\u0159\xEDv, ne\u017E se zept\xE1m.",
      halo: "Hv\u011Bzdy v proudech maj\xED u sebe slab\xE9 stopy staveb. Pr\xE1zdn\xE9, jako opu\u0161t\u011Bn\xE9 t\xE1bory.",
      pass: "Sonda vstoupila do hrdla. Puls zn\xED z obou stran z\xE1rove\u0148.",
      through: "Na druh\xE9 stran\u011B u\u017E byl pr\u016Fchod p\u0159ipraven\xFD, podle pl\xE1n\u016F VESPER. Puls je odpov\u011B\u010F na ot\xE1zku, kterou teprve polo\u017E\xEDm. M\xED\u0159\xED ke st\u0159edu galaxie.",
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
      dyson79: "Freeman Dyson v roce 1979 spo\u010D\xEDtal, \u017Ee mysl\xEDc\xED stroj u\u0161et\u0159\xED nejv\xEDc energie, kdy\u017E p\u0159em\xFD\u0161l\xED pomalu a mezi \xFAvahami sp\xED. Vesper to tak d\u011Bl\xE1: jeden den bd\xED, pak sp\xED a venku mezit\xEDm uplynou stalet\xED.",
      qpo: "Rentgenov\xE9 z\xE1blesky z disk\u016F kolem \u010Dern\xFDch d\u011Br m\xEDvaj\xED skoro pravideln\xFD rytmus, kvaziperiodick\xE9 oscilace. Vznikaj\xED bl\xEDzko nejbli\u017E\u0161\xED stabiln\xED dr\xE1hy.",
      rs: "Schwarzschild\u016Fv polom\u011Br d\xEDry o hmotnosti 8 Slunc\xED je asi 24 km. Kdyby se Zem\u011B stla\u010Dila do kuli\u010Dky o pr\u016Fm\u011Bru 18 mm, byla by z n\xED \u010Dern\xE1 d\xEDra.",
      accretion: "Akrece je po anihilaci nej\xFA\u010Dinn\u011Bj\u0161\xED zn\xE1m\xFD zdroj energie. Disk kolem rotuj\xEDc\xED d\xEDry vyz\xE1\u0159\xED a\u017E 32 % klidov\xE9 hmotnosti plynu, f\xFAze vod\xEDku jen 0,7 %.",
      gps: "Hodiny na dru\u017Eic\xEDch GPS jdou o 38 mikrosekund denn\u011B rychleji ne\u017E na Zemi. Bez korekce na relativitu by se navigace ka\u017Ed\xFD den spletla o kilometry.",
      isco: "Kolem nerotuj\xEDc\xED d\xEDry nejde ob\xEDhat bl\xED\u017E ne\u017E na trojn\xE1sobku Schwarzschildova polom\u011Bru. U rychle rotuj\xEDc\xED d\xEDry se nejbli\u017E\u0161\xED stabiln\xED dr\xE1ha p\u0159ibl\xED\u017E\xED skoro k horizontu.",
      cas: "Cassiopeia A je poz\u016Fstatek supernovy star\xFD asi 350 let. Jej\xED ob\xE1lka se rozp\xEDn\xE1 rychlost\xED p\u0159es 5 000 km/s.",
      eddington: "Eddingtonova mez: tlak z\xE1\u0159en\xED vyrovn\xE1 gravitaci. Pro d\xEDru o hmotnosti 8 Slunc\xED je to asi 10\xB3\xB2 W, 260 tis\xEDckr\xE1t v\xEDc, ne\u017E z\xE1\u0159\xED Slunce.",
      kerr: "Rotuj\xEDc\xED \u010Dernou d\xEDru popsal Roy Kerr v roce 1963. Rotace se ud\xE1v\xE1 \u010D\xEDslem od 0 do 1 a pozorovan\xE9 d\xEDry m\xEDvaj\xED p\u0159es 0,9.",
      tde: "Hv\u011Bzdu, kter\xE1 se p\u0159ibl\xED\u017E\xED k \u010Dern\xE9 d\xED\u0159e, rozt\xE1hnou slapov\xE9 s\xEDly do dlouh\xE9ho tenk\xE9ho proudu. Astronomov\xE9 takov\xE9 z\xE1blesky pozoruj\xED v j\xE1drech galaxi\xED.",
      bz: "Blandford\u016Fv\u2013Znajek\u016Fv proces (1977): magnetick\xE9 pole ukotven\xE9 u d\xEDry brzd\xED jej\xED rotaci a poh\xE1n\xED trysky. Tak z\xE1\u0159\xED kvasary.",
      fermi: "Fermiho paradox: vesm\xEDr je star\xFD a obrovsk\xFD, tak kde jsou v\u0161ichni? Enrico Fermi se tak pr\xFD zeptal u ob\u011Bda v roce 1950.",
      hawking: "Stephen Hawking v roce 1974 uk\xE1zal, \u017Ee \u010Dern\xE9 d\xEDry slab\u011B z\xE1\u0159\xED. Na\u0161e d\xEDra vyz\xE1\u0159\xED asi 10\u207B\xB3\u2070 W. D\xEDra o hmotnosti hory by z\xE1\u0159ila jako elektr\xE1rna.",
      penrose: "Roger Penrose v roce 1969 uk\xE1zal, \u017Ee z ergosf\xE9ry rotuj\xEDc\xED d\xEDry se d\xE1 vyt\u011B\u017Eit energie. U nejrychlej\u0161\xED rotace a\u017E 29 % hmotnosti d\xEDry.",
      er: "Einstein a Rosen popsali most v roce 1935. Byl tak \xFAzk\xFD a nest\xE1l\xFD, \u017Ee by j\xEDm nepro\u0161lo ani sv\u011Btlo.",
      casimir: "Casimir\u016Fv jev p\u0159edpov\u011Bd\u011Bl Hendrik Casimir v roce 1948. Zm\u011B\u0159it ho se poda\u0159ilo a\u017E v roce 1997.",
      morris: "Michael Morris a Kip Thorne v roce 1988 spo\u010D\xEDtali, \u017Ee pr\u016Fchodnou \u010Derv\xED d\xEDru by dr\u017Eela otev\u0159enou hmota se z\xE1pornou hustotou energie.",
      pll: "F\xE1zov\xFD z\xE1v\u011Bs dr\u017E\xED dvoje hodiny v taktu. Bez n\u011Bj by nefungovalo r\xE1dio, mobil ani GPS.",
      erepr: "Maldacena a Susskind v roce 2013 navrhli, \u017Ee ka\u017Ed\xE9 dv\u011B prov\xE1zan\xE9 \u010D\xE1stice spojuje mikroskopick\xE1 \u010Derv\xED d\xEDra. Hypot\xE9ze se \u0159\xEDk\xE1 ER = EPR.",
      sagan: "Carl Sagan odhadl v\xFDkon Typu III na 10\xB3\u2076 W. Cel\xE1 Ml\xE9\u010Dn\xE1 dr\xE1ha vyz\xE1\u0159\xED asi 5\xB710\xB3\u2076 W.",
      gw170817: "V srpnu 2017 zachytily detektory LIGO a Virgo sr\xE1\u017Eku neutronov\xFDch hv\u011Bzd a o dv\u011B sekundy pozd\u011Bji i jej\xED z\xE1blesk. Kilonova vytvo\u0159ila zlata za n\u011Bkolik Zem\xED.",
      rubin: "Proud v St\u0159elci je trosku trpasli\u010D\xED galaxie, kterou Ml\xE9\u010Dn\xE1 dr\xE1ha trh\xE1 u\u017E miliardy let. Ov\xEDj\xED se kolem cel\xE9 galaxie jako stuha.",
      fermib: "Fermiho bubliny objevil v roce 2010 dalekohled Fermi. Sahaj\xED 25 000 sv\u011Bteln\xFDch let nad a pod st\u0159ed galaxie.",
      nova: "Supernova vyz\xE1\u0159\xED za p\xE1r t\xFDdn\u016F tolik sv\u011Btla jako Slunce za cel\xFD \u017Eivot. V\u011Bt\u0161inu energie ale odnesou neutrina."
    },
    req: { moon: "Vesper prozkoum\xE1 Kelvar", giant: "Vesper prozkoum\xE1 Tauris", sun: "Vesper prozkoum\xE1 kor\xF3nu Aldry", typeI: "civilizace dos\xE1hne Typu I", stage1: "se Aldra nafoukne do rud\xE9ho veleobra", stage2: "za\u010Dne Aldra spalovat uhl\xEDk", stage3: "za\u010Dne Aldra spalovat neon a kysl\xEDk", stage4: "za\u010Dne Aldra spalovat k\u0159em\xEDk", nova: "Aldra skon\u010D\xED jako supernova", phase1: "za\u010Dne f\xE1ze Tenk\xFD disk", phase2: "za\u010Dne f\xE1ze Eddingtonova mez", phase3: "za\u010Dne f\xE1ze Magnetick\xE9 trysky", phase4: "za\u010Dne f\xE1ze Ergosf\xE9ra", eddCap: "disk naraz\xED na Eddingtonovu mez", ch4: "za\u010Dne Kapitola 4", bstage1: "za\u010Dne stadium \u0158et\u011Bz soustav", bstage2: "za\u010Dne stadium Typ III", bstage3: "za\u010Dne stadium Kilonova", bstage4: "za\u010Dne stadium Hv\u011Bzdn\xE9 proudy" }
  };

  // src/i18n/index.ts
  var dicts = { cs };
  var current = cs;
  function setLang(lang) {
    current = dicts[lang] ?? cs;
  }
  function t(key, vars) {
    let v = current;
    for (const part2 of key.split(".")) v = v?.[part2];
    if (typeof v !== "string") {
      let fb = cs;
      for (const part2 of key.split(".")) fb = fb?.[part2];
      v = typeof fb === "string" ? fb : key;
    }
    return vars ? v.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? "")) : v;
  }

  // src/core/defs.ts
  var RESOURCES = ["ore", "metal", "energy", "data", "plasma", "exotic"];
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
    // Kapitola 2, první stupeň: slabší stavby bez posílení od kolektorů. Vedou rychle k trychtýřům a separátorům.
    windnet: { base: { metal: 2e6 }, growth: 1.15, prod: { plasma: 2e7 }, unlock: ch2 },
    sieve: { base: { metal: 4e6, plasma: 1e8 }, growth: 1.15, prod: { metal: 1e7 }, cons: { plasma: 2e7 }, unlock: ch2 },
    corono: { base: { metal: 5e6, energy: 3e16 }, growth: 1.16, prod: { data: 5e9 }, cons: { energy: 2e12 }, unlock: ch2 },
    lifter: { base: { metal: 5e6, energy: 2e17 }, growth: 1.16, prod: { plasma: 1e6 }, cons: { energy: 1e6 }, unlock: (s) => !!s.r.lift && !s.star.done },
    separator: { base: { metal: 5e6, plasma: 2e7 }, growth: 1.16, prod: { metal: 5e6 }, cons: { plasma: 5e6 }, unlock: (s) => !!s.r.sep && !s.star.done },
    seismo: { base: { metal: 1e8, energy: 5e17 }, growth: 1.2, prod: { data: 5e10 }, cons: { energy: 2e13 }, unlock: (s) => !!s.r.seismo && !s.star.done },
    // Loděnice staví kolektory sama z podílu přírůstku kovu a energie (engine: fabTick); zásoby nevyčerpá.
    swarmfab: { base: { metal: 2e10, plasma: 5e9 }, growth: 1.3, makes: { building: "dyson", rate: 0.02 }, cons: { metal: 1, energy: 1 }, unlock: (s) => !!s.r.fab && !s.star.done },
    // Kapitola 3: černá díra. Plyn (plazma) z mlhoviny krmí akreční disk, kolektory chytají jeho záření.
    // Výkon disku a trysek, pokrytí kolektory a dilataci počítá engine (holeL, jetP, ringCov, gamma).
    scoop: { base: { plasma: 1e7 }, growth: 1.22, prod: { plasma: 1e5 }, unlock: (s) => !!s.r.accrete && hole3(s) },
    injector: { base: { plasma: 3e7 }, growth: 1.2, cons: { plasma: 2e5 }, unlock: (s) => !!s.r.mri && hole3(s) },
    ring: { base: { plasma: 6e7 }, growth: 1.15, prod: { energy: 1 }, unlock: (s) => !!s.r.accrete && hole3(s) },
    station: { base: { plasma: 3e8 }, growth: 1.22, prod: { data: 15e26 }, cons: { energy: 1e17 }, unlock: (s) => !!s.r.dilate && hole3(s) },
    jet: { base: { plasma: 35e13 }, growth: 1.18, prod: { energy: 1 }, unlock: (s) => !!s.r.mad && hole3(s) },
    hawking: { base: { plasma: 1e17, energy: 1e39 }, growth: 1.2, prod: { energy: 1, data: 1 }, cons: { plasma: 1e4 }, unlock: (s) => !!s.r.kugel && hole3(s) },
    // Orbitální montovna: sama staví diskové kolektory a tryskové lapače z podílu čistého přírůstku plazmatu (engine yardTick)
    yard: { base: { plasma: 3e16 }, growth: 1.6, unlock: (s) => !!s.r.yard && hole3(s) },
    // Kapitola 4: Most. Exotická hmota (kg) drží hrdla červích děr otevřená. Výkon domů počítá síť (bridge.ts).
    // Ruční stupeň: desky, majáky, roje, kotvy. Automatický stupeň: zámky, raziče, směrovače, páry, pumpy.
    plate: { base: { exotic: 2e18 }, growth: 1.15, prod: { exotic: 2e17 }, unlock: ch4 },
    bswarm: { base: { exotic: 3e18 }, growth: 1.13, unlock: ch4 },
    beacon: { base: { exotic: 4e18 }, growth: 1.4, prod: { data: 1 }, unlock: ch4 },
    anchor: { base: { exotic: 4e19 }, growth: 1.2, unlock: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 3 },
    pump: { base: { exotic: 3e21 }, growth: 1.16, prod: { exotic: 4e19 }, unlock: (s) => ch4(s) && !!s.r.pumpr },
    router: { base: { exotic: 2e21 }, growth: 1.3, unlock: (s) => ch4(s) && !!s.r.router },
    plock: { base: { exotic: 5e21 }, growth: 1.25, unlock: (s) => ch4(s) && !!s.r.plockr },
    raider: { base: { exotic: 3e21 }, growth: 1.3, unlock: (s) => ch4(s) && !!s.r.raider },
    pair: { base: { exotic: 2e22 }, growth: 1.25, unlock: (s) => ch4(s) && !!s.r.pairs },
    kcol: { base: { exotic: 3e23 }, growth: 1.2, prod: { exotic: 1e20, data: 1 }, unlock: (s) => ch4(s) && !!s.visited.kilonova },
    gwdet: { base: { exotic: 1e24 }, growth: 1.22, prod: { data: 1 }, unlock: (s) => ch4(s) && !!s.r.detector },
    trap: { base: { exotic: 2e24 }, growth: 1.2, unlock: (s) => ch4(s) && !!s.r.trapr }
  };
  var BUILDING_IDS = Object.keys(BUILDINGS);
  function ch2(s) {
    return s.chapterDone >= 1 && !s.star.done;
  }
  function ch4(s) {
    return !!s.hole?.done;
  }
  function bstage(n) {
    return (s) => ch4(s) && (s.bridge?.stage ?? 0) >= n;
  }
  var B = BUILDINGS;
  var hole3 = (s) => s.star.done && !s.hole?.done;
  var phase = (n) => (s) => s.star.done && (s.hole?.phase ?? 0) >= n;
  var stage = (n) => (s) => s.chapterDone >= 1 && s.star.stage >= n && !s.star.done;
  var has = (...ids) => (s) => ids.every((id) => s.r[id] || s.visited[id]);
  var RESEARCH = {
    vib: { cost: { data: 2e4 } },
    swarm: { cost: { data: 5e4 } },
    deep: { cost: { data: 8e4 } },
    arc: { cost: { data: 12e4 } },
    scan: { cost: { data: 11e4 } },
    thinfilm: { cost: { data: 16e4 } },
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
    plasma: { cost: { data: 9e7 }, req: has("forge", "fusion") },
    quantum: { cost: { data: 2e8 }, req: has("cryo", "fusion") },
    vib2: { cost: { data: 6e8 }, req: has("resonance", "giant") },
    dyson: { cost: { data: 1e9 }, req: has("sun"), reqKey: "sun" },
    nano: { cost: { data: 4e9 }, req: has("dyson") },
    statite: { cost: { data: 12e9 }, req: has("dyson") },
    induct: { cost: { data: 4e10 }, req: has("nano") },
    beam: { cost: { data: 2e11 }, req: has("statite") },
    lagrange: { cost: { data: 1e12 }, req: has("beam") },
    // Kapitola 2: Hvězda
    lift: { cost: { data: 2e14 }, req: (s) => s.chapterDone >= 1, reqKey: "typeI" },
    sep: { cost: { data: 25e13 }, req: has("lift") },
    seismo: { cost: { data: 3e14 }, req: has("lift") },
    coil: { cost: { data: 2e15 }, req: has("lift") },
    fab: { cost: { data: 8e15 }, req: has("sep") },
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
    neutrino: { cost: { data: 3e31 }, req: stage(4), reqKey: "stage4" },
    // Kapitola 3: Horizont
    accrete: { cost: { data: 1e30 }, req: (s) => s.star.done, reqKey: "nova" },
    dilate: { cost: { data: 1e33 }, req: phase(1), reqKey: "phase1" },
    prograde: { cost: { data: 1e31 }, req: has("accrete") },
    magscoop: { cost: { data: 4e31 }, req: has("accrete") },
    wide: { cost: { data: 15e31 }, req: has("accrete") },
    mri: { cost: { data: 12e33 }, req: phase(1), reqKey: "phase1" },
    lower: { cost: { data: 8e33 }, req: phase(1), reqKey: "phase1" },
    pulse3: { cost: { data: 4e34 }, req: phase(1), reqKey: "phase1" },
    thick: { cost: { data: 2e35 }, req: phase(1), reqKey: "phase1" },
    slim: { cost: { data: 1e36 }, req: (s) => phase(2)(s) && !!s.hole.cap, reqKey: "eddCap" },
    mad: { cost: { data: 4e36 }, req: phase(2), reqKey: "phase2" },
    edge: { cost: { data: 2e37 }, req: phase(2), reqKey: "phase2" },
    bz: { cost: { data: 1e38 }, req: phase(3), reqKey: "phase3" },
    fermi: { cost: { data: 3e38 }, req: phase(3), reqKey: "phase3" },
    kugel: { cost: { data: 1e39 }, req: phase(3), reqKey: "phase3" },
    penrose: { cost: { data: 1e40 }, req: phase(4), reqKey: "phase4" },
    evap: { cost: { data: 2e40 }, req: phase(4), reqKey: "phase4" },
    yard: { cost: { data: 3e38 }, req: phase(3), reqKey: "phase3" },
    dive: { cost: { data: 6e40 }, req: phase(4), reqKey: "phase4" },
    // Kapitola 4: Most
    interf: { cost: { data: 15e39 }, req: ch4, reqKey: "ch4" },
    widen: { cost: { data: 4e40 }, req: ch4, reqKey: "ch4" },
    vacuum: { cost: { data: 2e41 }, req: has("widen") },
    router: { cost: { data: 8e41 }, req: bstage(1), reqKey: "bstage1" },
    plockr: { cost: { data: 2e42 }, req: has("router") },
    raider: { cost: { data: 4e42 }, req: has("router") },
    pumpr: { cost: { data: 15e41 }, req: bstage(1), reqKey: "bstage1" },
    pairs: { cost: { data: 2e43 }, req: bstage(2), reqKey: "bstage2" },
    spectral: { cost: { data: 4e43 }, req: bstage(2), reqKey: "bstage2" },
    quiet: { cost: { data: 6e43 }, req: has("plockr", "pairs") },
    pairs2: { cost: { data: 2e44 }, req: bstage(3), reqKey: "bstage3" },
    shifted: { cost: { data: 6e43 }, req: bstage(3), reqKey: "bstage3" },
    detector: { cost: { data: 1e44 }, req: bstage(3), reqKey: "bstage3" },
    microlens: { cost: { data: 1e45 }, req: bstage(4), reqKey: "bstage4" },
    trapr: { cost: { data: 4e44 }, req: bstage(4), reqKey: "bstage4" },
    passage: { cost: { data: 2e45 }, req: bstage(4), reqKey: "bstage4" }
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
    dust: { cost: 3e29, time: 100, orbit: 0.42, angle: 2.9, speed: 0.012, req: (s) => s.chapterDone >= 1 && s.star.stage >= 3 && !s.star.done },
    // Kapitola 3: mise kolem černé díry za energii ze supernovy
    cas: { cost: 1e41, time: 90, orbit: 0.82, angle: 0.6, speed: 3e-3, req: (s) => s.star.done && !!s.r.accrete },
    lens: { cost: 3e41, time: 120, orbit: 0.95, angle: 3.6, speed: 2e-3, req: phase(1) },
    tde: { cost: 1e42, time: 120, orbit: 0.62, angle: 2.2, speed: 6e-3, req: phase(2) },
    pole: { cost: 2e42, time: 90, orbit: 0.3, angle: 4.9, speed: 0, req: phase(3) },
    ergo: { cost: 4e42, time: 150, orbit: 0.16, angle: 1.4, speed: 0, req: phase(4) },
    // další cesty za energii ze supernovy (Kap. 3)
    oort: { cost: 3e41, time: 100, orbit: 0.99, angle: 5.4, speed: 15e-4, req: (s) => s.star.done && !!s.r.accrete },
    pulsar: { cost: 12e41, time: 110, orbit: 0.88, angle: 2.8, speed: 25e-4, req: phase(1) },
    cloud: { cost: 4e42, time: 140, orbit: 0.97, angle: 4.3, speed: 1e-3, req: phase(2) },
    dwarf: { cost: 1e43, time: 120, orbit: 0.5, angle: 0.2, speed: 8e-3, req: phase(3) },
    stream: { cost: 25e42, time: 150, orbit: 0.72, angle: 3.2, speed: 4e-3, req: phase(4) },
    // Kapitola 4: mise v oblasti galaxie (orbit/angle = poloha na mapě galaxie)
    flyby: { cost: 1e42, time: 60, orbit: 0.68, angle: 4.4, speed: 0, req: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 1 },
    magnetar: { cost: 2e42, time: 90, orbit: 0.45, angle: 3.1, speed: 0, req: bstage(1) },
    globular: { cost: 3e42, time: 100, orbit: 0.9, angle: 4.5, speed: 0, req: bstage(2) },
    kilonova: { cost: 4e42, time: 120, orbit: 0.38, angle: 2.4, speed: 0, req: bstage(2) },
    frb: { cost: 4e42, time: 90, orbit: 0.92, angle: 0.8, speed: 0, req: bstage(3) },
    rotation: { cost: 5e42, time: 120, orbit: 0.99, angle: 5.3, speed: 0, req: bstage(4) },
    bubbles: { cost: 6e42, time: 150, orbit: 0.06, angle: 1.57, speed: 0, req: (s) => bstage(4)(s) && has("rotation")(s) }
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
  var PHASES = [
    { id: "fallback", needW: 1e23, disk: 0 },
    { id: "thin", needW: 1e27, disk: 1 },
    { id: "edd", needW: 8e31, disk: 2 },
    { id: "jets", needW: 4e33, disk: 3 },
    { id: "ergo", needW: 2e34, disk: 4 }
  ];
  var HOLE = {
    massSun: 8,
    massKg: 8 * 1989e27,
    c2: 898755e11,
    rsKm: 23.6,
    // Schwarzschildův poloměr 2GM/c²
    eddW: 126e29 * 8,
    // Eddingtonova svítivost
    spin0: 0.2,
    // rotace díry na začátku kapitoly
    spinMax: 0.998,
    // Thorneova mez
    spinRate: 0.02,
    // jak rychle se rotace blíží rovnováze (1/s)
    ringF: 0.03,
    // kolik disku zakryje jeden kolektor
    jetF: 0.04,
    // kolik trysek zachytí jeden lapač
    dataFb: 0.4,
    // stanice sílí s výkonem civilizace (P/1e20)^0.4
    hawkData: 1e5,
    // bajtů za každý joule Hawkingova záření (informace z vypařování)
    fbBase: 1e20,
    startPlasma: 6e7,
    // plyn ze zpětného pádu na začátku kapitoly
    diveSec: 30
  };
  var PRESTIGE = { per: 0.25, metalUnit: 1e12, perOrder: 2 };
  var EVENTS = {
    // v Kapitole 2 ruda ani zásoba energie nepomůžou: místo komet a erupcí kovový asteroid a protuberance
    comet: { res: "ore", seconds: 90, min: 50, unlock: (s) => s.b.drone >= 2 && !s.chapterDone },
    flare: { res: "energy", seconds: 60, min: 5e4, unlock: (s) => s.b.solar >= 1 && !s.chapterDone },
    mtype: { res: "metal", seconds: 90, min: 1e9, unlock: (s) => s.chapterDone >= 1 && !s.star.done },
    echo: { res: "data", seconds: 60, min: 2e3, unlock: (s) => !!s.r.scan },
    prominence: { res: "plasma", seconds: 90, min: 1e6, unlock: (s) => s.b.lifter >= 1 && !s.star.done },
    // Kapitola 3: shluk plynu z mlhoviny
    clump: { res: "plasma", seconds: 90, min: 1e7, unlock: (s) => s.b.scoop >= 1 && hole3(s) },
    // Kapitola 4: fluktuace hrdla (exotika)
    flux: { res: "exotic", seconds: 90, min: 1e19, unlock: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 1 }
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
    { id: "salvage", when: (s) => !!s.salvaged },
    { id: "nova", when: (s) => s.star.done },
    // Kapitola 3
    { id: "hole", when: (s) => !!s.r.accrete },
    { id: "disk", when: (s) => s.b.ring >= 1 && (s.vent?.best ?? 0) >= 1 },
    { id: "station", when: (s) => s.b.station >= 1 },
    { id: "chain5", when: (s) => (s.vent?.best ?? 0) >= 5 },
    { id: "burst", when: (s) => (s.vent?.over ?? 0) > 0 && !s.hole?.done },
    { id: "inj", when: (s) => s.b.injector >= 1 },
    { id: "station10", when: (s) => s.b.station >= 10 },
    { id: "spin", when: (s) => (s.hole?.a ?? 0) >= 0.9 && !s.hole?.done },
    { id: "yard", when: (s) => (s.b.yard ?? 0) >= 1 },
    { id: "hawk", when: (s) => s.b.hawking >= 1 },
    { id: "thin", when: (s) => (s.hole?.phase ?? 0) >= 1 },
    { id: "pulse3", when: (s) => !!s.r.pulse3 },
    { id: "edd", when: (s) => (s.hole?.phase ?? 0) >= 2 },
    { id: "lens", when: (s) => !!s.visited.lens },
    { id: "jets", when: (s) => s.b.jet >= 1 },
    { id: "fermi", when: (s) => !!s.r.fermi },
    { id: "ergo", when: (s) => (s.hole?.phase ?? 0) >= 4 },
    { id: "dive", when: (s) => (s.hole?.dive ?? -1) >= 0 },
    { id: "horizon", when: (s) => !!s.hole?.done },
    // Kapitola 4
    { id: "order", when: (s) => !!s.bridge?.started },
    { id: "where", when: (s) => !!s.bridge?.started && s.b.plate >= 1 },
    { id: "bridge1", when: (s) => (s.bridge?.n ?? 0) >= 1 },
    { id: "full", when: (s) => !!s.bridge?.fullSeen },
    { id: "net5", when: (s) => (s.bridge?.n ?? 0) >= 5 },
    { id: "lock1", when: (s) => (s.bridge?.locks ?? 0) >= 1 },
    { id: "relic", when: (s) => (s.bridge?.stage ?? 0) >= 1 && (s.bridge?.n ?? 0) >= 8 },
    { id: "cluster", when: (s) => !!s.bridge?.cluster },
    { id: "auto4", when: (s) => s.b.router >= 1 },
    { id: "pair", when: (s) => s.b.pair >= 1 },
    { id: "net20", when: (s) => (s.bridge?.n ?? 0) >= 20 },
    { id: "rhythm", when: (s) => (s.bridge?.locks ?? 0) >= 12 },
    { id: "typeIII", when: (s) => ch4(s) && s.peakK >= 3 },
    { id: "kilonova", when: (s) => !!s.visited.kilonova },
    { id: "shifted", when: (s) => !!s.r.shifted },
    { id: "halo", when: (s) => !!s.visited.rotation },
    { id: "pass", when: (s) => (s.bridge?.pass ?? -1) >= 0 },
    { id: "net2", when: (s) => (s.bridge?.n ?? 0) >= 2 },
    { id: "net3", when: (s) => (s.bridge?.n ?? 0) >= 3 },
    { id: "blue", when: (s) => !!s.bridge?.ty?.blue },
    { id: "neutron", when: (s) => !!s.bridge?.ty?.neutron },
    { id: "anchor", when: (s) => ch4(s) && s.b.anchor >= 1 },
    { id: "flyby", when: (s) => !!s.visited.flyby },
    { id: "beacon5", when: (s) => ch4(s) && s.b.beacon >= 5 },
    { id: "lock5", when: (s) => (s.bridge?.locks ?? 0) >= 5 },
    { id: "nebula", when: (s) => !!s.bridge?.ty?.nebula },
    { id: "throat5", when: (s) => (s.bridge?.maxLv ?? 0) >= 5 },
    { id: "magnetar", when: (s) => !!s.visited.magnetar },
    { id: "net12", when: (s) => (s.bridge?.n ?? 0) >= 12 },
    { id: "pump", when: (s) => ch4(s) && s.b.pump >= 1 },
    { id: "plock", when: (s) => ch4(s) && s.b.plock >= 1 },
    { id: "raider", when: (s) => ch4(s) && s.b.raider >= 1 },
    { id: "globular", when: (s) => !!s.visited.globular },
    { id: "lock25", when: (s) => (s.bridge?.locks ?? 0) >= 25 },
    { id: "net30", when: (s) => (s.bridge?.n ?? 0) >= 30 },
    { id: "frb", when: (s) => !!s.visited.frb },
    { id: "trap", when: (s) => ch4(s) && s.b.trap >= 1 },
    { id: "net40", when: (s) => (s.bridge?.n ?? 0) >= 40 },
    { id: "bubbles", when: (s) => !!s.visited.bubbles },
    { id: "through", when: (s) => !!s.bridge?.done }
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
    { id: "nova", when: (s) => s.star.done },
    { id: "rs", when: (s) => !!s.r.accrete },
    { id: "dyson79", when: (s) => s.star.done && s.time > 0 },
    { id: "qpo", when: (s) => (s.vent?.best ?? 0) >= 3 },
    { id: "accretion", when: (s) => (s.vent?.best ?? 0) >= 1 },
    { id: "gps", when: (s) => s.b.station >= 1 },
    { id: "isco", when: (s) => !!s.r.prograde },
    { id: "cas", when: (s) => !!s.visited.cas },
    { id: "eddington", when: (s) => (s.hole?.phase ?? 0) >= 2 },
    { id: "kerr", when: (s) => (s.hole?.a ?? 0) >= 0.9 },
    { id: "tde", when: (s) => !!s.visited.tde },
    { id: "bz", when: (s) => s.b.jet >= 1 },
    { id: "fermi", when: (s) => !!s.r.fermi },
    { id: "hawking", when: (s) => !!s.r.kugel },
    { id: "penrose", when: (s) => !!s.r.penrose },
    // Kapitola 4
    { id: "er", when: (s) => (s.bridge?.n ?? 0) >= 1 },
    { id: "casimir", when: (s) => ch4(s) && s.b.plate >= 1 },
    { id: "morris", when: (s) => (s.bridge?.n ?? 0) >= 3 },
    { id: "pll", when: (s) => s.b.plock >= 1 },
    { id: "erepr", when: (s) => s.b.pair >= 1 },
    { id: "sagan", when: (s) => ch4(s) && s.peakK >= 3 },
    { id: "gw170817", when: (s) => !!s.visited.kilonova },
    { id: "rubin", when: (s) => !!s.visited.rotation },
    { id: "fermib", when: (s) => !!s.visited.bubbles }
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

  // src/core/bridge.ts
  var MAP = { w: 1.6, h: 1, ly: 4e3 };
  var HOME = { id: "home", name: "", type: "home", x: 0.16, y: 0.6, L: 0, d: 0, rank: -1 };
  var NET = {
    reach: 0.3,
    // nejdelší most (jednotky mapy)
    reveal0: 3,
    // soustavy vidět hned na začátku
    open0: 2e18,
    // cena prvního mostu (kg exotiky)
    openG: 1.45,
    // každý další most dražší
    up0: 4e18,
    // rozšíření hrdla z úrovně 0
    upG: 2,
    // a každá další úroveň
    cap0: 2e33,
    // propustnost hrdla úrovně 0 (W)
    capG: 1.35,
    // propustnost za úroveň (plocha hrdla)
    swarmF: 0.05,
    // kolik záření soustavy zachytí jeden roj
    trapF: 0.05,
    // kolik temné hmoty zachytí jedna anihilační past
    anchorK: 0.02,
    // kotvy: propustnost až ×3, víc s každou deskou
    wave: 0.55,
    // rychlost vlny pulsu (jednotky mapy za s)
    pulse: 7.3,
    lockM: 1.5,
    // ruční zámek
    autoM: 1.3,
    // fázový zámek
    autoM2: 1.45,
    // fázový zámek s Tichou sítí
    autoShare: 0.05,
    // kolik čistého přírůstku exotiky si bere jeden razič/směrovač
    autoMax: 0.5,
    // všichni dohromady nejvýš
    pairM: 1.1,
    pairM2: 1.12,
    holeData: 120,
    // archiv dat při startu (sekundy výroby stanic a reaktorů)
    startExotic: 12e18,
    passSec: 30
  };
  var BSTAGES = [
    { id: "first", needW: 38e33 },
    { id: "chain", needW: 3e35 },
    { id: "type3", needW: 12e35 },
    { id: "kilo", needW: 35e35 },
    { id: "halo", needW: 65e35 }
  ];
  var TYPE_L = {
    home: 0,
    red: 2e25,
    sun: 4e26,
    binary: 3e27,
    neutron: 1e27,
    blue: 3e32,
    assoc: 3e33,
    cluster: 6e33,
    nebula: 2e34,
    arm: 6e35,
    kilo: 2e33,
    stream: 13e35
  };
  function mulberry(a) {
    return () => {
      a |= 0;
      a = a + 1831565813 | 0;
      let t2 = Math.imul(a ^ a >>> 15, 1 | a);
      t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2;
      return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296;
    };
  }
  var GREEK = ["Kappa", "Tessa", "Hesper", "Vr\xE1na", "Lyra", "Sirma", "Mira", "Velka", "Ostra", "Dalen", "Ivra", "Selen", "Kora", "Nadir", "Ambra", "Tilia", "Rhea", "Zora", "Elva", "Pelan"];
  function nameFor(type, r, used) {
    for (let k = 0; k < 50; k++) {
      const n = Math.floor(r() * 9e3) + 1e3;
      const g = GREEK[Math.floor(r() * GREEK.length)];
      const nm = type === "red" ? `GJ ${n}` : type === "sun" ? g : type === "binary" ? `${g} A/B` : type === "neutron" ? `PSR J${n}` : type === "blue" ? `HD ${n * 31 % 99999}` : type === "assoc" ? `OB ${g} ${1 + n % 9}` : type === "cluster" ? `NGC ${n}` : type === "nebula" ? `${g} \xB7 mlhovina` : type === "arm" ? `Rameno ${String.fromCharCode(65 + n % 8)}${n % 90 + 10}` : type === "kilo" ? `GW ${n}` : `Proud Sgr ${String.fromCharCode(65 + n % 6)}${n % 9 + 1}`;
      if (!used.has(nm)) {
        used.add(nm);
        return nm;
      }
    }
    return `X ${used.size}`;
  }
  function pickType(d, r) {
    if (d < 0.36) return r < 0.4 ? "red" : r < 0.62 ? "sun" : r < 0.76 ? "binary" : r < 0.86 ? "neutron" : "blue";
    if (d < 0.72) return r < 0.3 ? "blue" : r < 0.42 ? "binary" : r < 0.5 ? "neutron" : r < 0.78 ? "assoc" : "cluster";
    if (d < 1.08) return r < 0.28 ? "assoc" : r < 0.52 ? "cluster" : r < 0.86 ? "nebula" : "neutron";
    return r < 0.6 ? "arm" : r < 0.85 ? "nebula" : "cluster";
  }
  function generate(seed2) {
    const r = mulberry(seed2), nodes = [], all = [{ x: HOME.x, y: HOME.y }];
    const free = (x, y, m) => all.every((p) => Math.hypot(p.x - x, p.y - y) >= m);
    const place = (n, ok, m) => {
      const out = [];
      for (let k = 0; k < 4e4 && out.length < n; k++) {
        const x = 0.05 + r() * (MAP.w - 0.1), y = 0.06 + r() * (MAP.h - 0.12);
        if (!ok(x, y) || !free(x, y, m)) continue;
        out.push({ x, y });
        all.push({ x, y });
      }
      return out;
    };
    const dist2 = (x, y) => Math.hypot(x - HOME.x, y - HOME.y);
    const normal = place(46, (x, y) => dist2(x, y) > 0.11, 0.1);
    const used = /* @__PURE__ */ new Set();
    normal.sort((a, b) => dist2(a.x, a.y) - dist2(b.x, b.y)).forEach((p, i) => {
      const d = dist2(p.x, p.y), type = i < 3 ? ["red", "sun", "neutron"][i] : pickType(d, r());
      nodes.push({ id: "n" + i, name: nameFor(type, r, used), type, x: p.x, y: p.y, L: TYPE_L[type] * Math.pow(10, r() * 0.6 - 0.3), d, rank: i });
    });
    place(3, (x, y) => dist2(x, y) > 0.7 && dist2(x, y) < 1.05, 0.09).forEach((p, i) => nodes.push({ id: "k" + i, name: nameFor("kilo", r, used), type: "kilo", x: p.x, y: p.y, L: TYPE_L.kilo * (1 + i * 0.4), d: dist2(p.x, p.y), rank: 100 + i }));
    place(6, (x, y) => dist2(x, y) > 0.95 && (y < 0.2 || y > 0.8 || x > 1.4), 0.09).forEach((p, i) => nodes.push({ id: "d" + i, name: nameFor("stream", r, used), type: "stream", x: p.x, y: p.y, L: TYPE_L.stream * Math.pow(10, r() * 0.4 - 0.2), d: dist2(p.x, p.y), rank: 200 + i }));
    return nodes;
  }
  function connectedAll(nodes) {
    const seen = /* @__PURE__ */ new Set(["home"]), q = [HOME];
    while (q.length) {
      const a = q.shift();
      for (const b of nodes) if (!seen.has(b.id) && Math.hypot(a.x - b.x, a.y - b.y) <= NET.reach * 0.92) {
        seen.add(b.id);
        q.push(b);
      }
    }
    return seen.size === nodes.length + 1;
  }
  var seed0 = 7331;
  var gen = generate(seed0);
  while (!connectedAll(gen) && seed0 < 7431) gen = generate(++seed0);
  var NODES = gen;
  var NODE = Object.fromEntries([HOME, ...NODES].map((n) => [n.id, n]));
  var NORMAL = NODES.filter((n) => n.rank < 100);
  function revealCount(s) {
    const b = Math.floor(s.b.beacon);
    return NET.reveal0 + b + (s.r.interf ? Math.floor(b / 2) : 0) + (s.visited.flyby ? 2 : 0);
  }
  function isRevealed(s, n) {
    if (n.type === "home") return true;
    if (n.type === "kilo") return !!s.visited.kilonova;
    if (n.type === "stream") return !!s.visited.rotation;
    return n.rank < revealCount(s) || !!s.bridge.links[n.id];
  }
  var revealed = (s) => NODES.filter((n) => isRevealed(s, n));
  var isConnected = (s, id) => id === "home" || !!s.bridge.links[id];
  var dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  var linkLen = (id, l) => dist(NODE[l.p], NODE[id]);
  function capture(s) {
    return 1 - Math.exp(-Math.floor(s.b.bswarm) * NET.swarmF * pairMult(s));
  }
  function trapCapture(s) {
    return 1 - Math.exp(-Math.floor(s.b.trap) * NET.trapF * (s.r.microlens ? 3 : 1));
  }
  var pairMult = (s) => Math.pow(s.r.pairs2 ? NET.pairM2 : NET.pairM, Math.floor(s.b.pair));
  function countType(s, t2) {
    let n = 0;
    for (const id in s.bridge.links) if (NODE[id]?.type === t2) n++;
    return n;
  }
  function nodeOut(s, n, links = s.bridge.links) {
    if (n.type === "home") return 0;
    if (n.type === "stream") return n.L * trapCapture(s);
    let v = n.L * capture(s);
    if (s.r.spectral && (n.type === "blue" || n.type === "assoc")) v *= 2;
    if (n.type === "cluster" && s.visited.globular) v *= 2;
    const l = links[n.id];
    if (l && NODE[l.p]?.type === "cluster") v *= 1.5;
    for (const id in links) if (links[id].p === n.id && NODE[id].type === "cluster") {
      v *= 1.5;
      break;
    }
    return v;
  }
  var anchorPer = (s, plates = Math.floor(s.b.plate)) => NET.anchorK * (1 + plates / 20);
  function anchorMult(s, anchors = Math.floor(s.b.anchor), plates = Math.floor(s.b.plate)) {
    return 1 + 2 * (1 - Math.exp(-anchors * anchorPer(s, plates)));
  }
  function lockMult(s, l) {
    if (l.lk <= 0) return 1;
    return l.la ? s.r.quiet ? NET.autoM2 : NET.autoM : NET.lockM;
  }
  function capBase(s, lv) {
    return NET.cap0 * Math.pow(NET.capG, lv) * anchorMult(s) * (s.r.widen ? 1.5 : 1);
  }
  var capOf = (s, l) => capBase(s, l.lv) * lockMult(s, l);
  function network(s, links = s.bridge.links, override) {
    var _a;
    const kids = {};
    for (const id in links) (kids[_a = links[id].p] ?? (kids[_a] = [])).push(id);
    const supply = {}, flow = {};
    const walk = (id) => {
      let sum = id === "home" ? 0 : nodeOut(s, NODE[id], links);
      for (const k of kids[id] ?? []) sum += walk(k);
      if (id === "home") return sum;
      const l = links[id], lv = override?.id === id ? override.lv : l.lv;
      supply[id] = sum;
      flow[id] = Math.min(sum, capBase(s, lv) * lockMult(s, l));
      return flow[id];
    };
    const total = walk("home");
    return { supply, flow, total };
  }
  var netCache = { key: "", v: { supply: {}, flow: {}, total: 0 } };
  function netNow(s) {
    const key = `${s.time}|${s.bridge.n}|${s.b.bswarm}|${s.b.trap}|${s.b.anchor}|${s.b.pair}|${Object.keys(s.r).length}|${Object.values(s.bridge.links).map((l) => l.lv + (l.lk > 0 ? l.la ? "a" : "m" : "")).join()}`;
    if (key !== netCache.key) netCache = { key, v: network(s) };
    return netCache.v;
  }
  function netPower(s) {
    return ch4(s) && s.bridge.started ? netNow(s).total : 0;
  }
  function openCost(s, from, to) {
    const len = dist(NODE[from], NODE[to]);
    return NET.open0 * Math.pow(NET.openG, s.bridge.n) * (0.5 + len / 0.2);
  }
  function upCost(_s, lv) {
    return NET.up0 * Math.pow(NET.upG, lv);
  }
  function canLink(s, from, to) {
    const a = NODE[from], b = NODE[to];
    return !!a && !!b && ch4(s) && isConnected(s, from) && !isConnected(s, to) && isRevealed(s, b) && dist(a, b) <= NET.reach;
  }
  function bestFrom(s, to) {
    let best = null, bc = Infinity;
    for (const id of ["home", ...Object.keys(s.bridge.links)]) {
      if (!canLink(s, id, to)) continue;
      const c = openCost(s, id, to);
      if (c < bc) {
        bc = c;
        best = id;
      }
    }
    return best;
  }
  function addLink(s, from, to) {
    var _a;
    s.bridge.links[to] = { p: from, lv: 0, lk: 0, la: false, t: s.time };
    s.bridge.n++;
    if (NODE[to]?.type === "cluster") s.bridge.cluster = true;
    ((_a = s.bridge).ty ?? (_a.ty = {}))[NODE[to]?.type ?? "x"] = true;
  }
  function openLink(s, from, to) {
    if (!canLink(s, from, to)) return false;
    const c = openCost(s, from, to);
    if (s.res.exotic < c) return false;
    s.res.exotic -= c;
    addLink(s, from, to);
    return true;
  }
  function widen(s, id) {
    const l = s.bridge.links[id];
    if (!l) return false;
    const c = upCost(s, l.lv);
    if (s.res.exotic < c) return false;
    s.res.exotic -= c;
    l.lv++;
    return true;
  }
  function widenGain(s, id) {
    const l = s.bridge.links[id];
    if (!l) return 0;
    return Math.max(0, network(s, s.bridge.links, { id, lv: l.lv + 1 }).total - netNow(s).total);
  }
  function openGain(s, from, to) {
    const links = { ...s.bridge.links, [to]: { p: from, lv: 0, lk: 0, la: false, t: 0 } };
    return Math.max(0, network(s, links).total - netNow(s).total);
  }
  function bestOpen(s) {
    let best = null, bv = -1;
    for (const n of revealed(s)) {
      if (isConnected(s, n.id)) continue;
      const from = bestFrom(s, n.id);
      if (!from) continue;
      const cost2 = openCost(s, from, n.id), gain = openGain(s, from, n.id);
      const v = (gain + 0.15 * nodeOut(s, n)) / cost2;
      if (v > bv) {
        bv = v;
        best = { from, to: n.id, cost: cost2, gain };
      }
    }
    return best;
  }
  function worstLink(s) {
    const f = netNow(s);
    let best = null, bv = 0;
    for (const id in s.bridge.links) {
      const ex = f.supply[id] - capBase(s, s.bridge.links[id].lv);
      if (ex > bv) {
        bv = ex;
        best = id;
      }
    }
    return best;
  }
  function limiter(s, id = null) {
    var _a;
    const f = netNow(s), L2 = s.bridge.links;
    const kids = {};
    for (const k in L2) (kids[_a = L2[k].p] ?? (kids[_a] = [])).push(k);
    let best = null, bv = 1.001;
    const walk = (k) => {
      if (k !== "home") {
        const r = (f.supply[k] ?? 0) / capOf(s, L2[k]);
        if (r > bv) {
          bv = r;
          best = k;
        }
      }
      for (const c of kids[k] ?? []) walk(c);
    };
    walk(id ?? "home");
    return best;
  }
  var fillOf = (s, id) => (netNow(s).supply[id] ?? 0) / capOf(s, s.bridge.links[id]);
  var SYNC_UPS = { win: { base: 2e19, g: 8, max: 4 }, len: { base: 3e19, g: 8, max: 4 }, dbl: { base: 8e20, g: 1, max: 1 } };
  var SYNC_IDS = Object.keys(SYNC_UPS);
  var syncLv = (s, id) => s.bridge.lv[id] ?? 0;
  var syncWin = (s, l = syncLv(s, "win")) => 1.4 + 0.3 * l;
  var lockLen = (s, l = syncLv(s, "len")) => 90 + 30 * l;
  var syncCost = (s, id) => SYNC_UPS[id].base * Math.pow(SYNC_UPS[id].g, syncLv(s, id));
  function syncUpgrade(s, id) {
    const c = syncCost(s, id);
    if (!ch4(s) || syncLv(s, id) >= SYNC_UPS[id].max || s.res.exotic < c) return false;
    s.res.exotic -= c;
    s.bridge.lv[id] = syncLv(s, id) + 1;
    return true;
  }
  function hitTime(id, l) {
    const a = NODE[l.p], b = NODE[id];
    return Math.hypot((a.x + b.x) / 2 - HOME.x, (a.y + b.y) / 2 - HOME.y) / NET.wave;
  }
  var wavePhase = (s) => s.time % NET.pulse;
  function waveOff(s, id) {
    const l = s.bridge.links[id];
    if (!l) return 99;
    const th = hitTime(id, l), ph = wavePhase(s);
    let off = Math.abs(ph - th);
    if (syncLv(s, "dbl")) off = Math.min(off, Math.abs(ph - NET.pulse / 2 - th), Math.abs(ph + NET.pulse / 2 - th));
    return off;
  }
  var inWave = (s, id) => waveOff(s, id) <= syncWin(s) / 2;
  function tapLock(s, id) {
    const l = s.bridge.links[id];
    if (!l || !inWave(s, id)) return false;
    l.lk = lockLen(s);
    l.la = false;
    s.bridge.locks++;
    return true;
  }
  function autoShares(s) {
    const nr = s.off.raider ? 0 : Math.floor(s.b.raider), nt = s.off.router ? 0 : Math.floor(s.b.router);
    const want = NET.autoShare * (nr + nt), k = want > NET.autoMax ? NET.autoMax / want : 1;
    return { raider: NET.autoShare * nr * k, router: NET.autoShare * nt * k };
  }
  function exoticProd(s, prodOf2) {
    let v = 0;
    for (const id of ["plate", "pump", "kcol"]) if (s.b[id] >= 1) v += prodOf2(id, "exotic") * Math.floor(s.b[id]);
    return v;
  }
  function bridgeTick(s, dt, prod) {
    const br = s.bridge;
    for (const id in br.links) {
      const l = br.links[id];
      if (l.lk > 0) l.lk = Math.max(0, l.lk - dt);
    }
    const ph = wavePhase(s), wrapped = (br.wave ?? 0) > ph;
    br.wave = ph;
    if (wrapped && s.b.plock >= 1 && !s.off.plock) {
      const f = netNow(s), n = Math.floor(s.b.plock);
      const ids = Object.keys(br.links).filter((id) => !(br.links[id].lk > 0 && !br.links[id].la)).sort((a, b) => f.supply[b] / capBase(s, br.links[b].lv) - f.supply[a] / capBase(s, br.links[a].lv)).slice(0, n);
      for (const id of ids) {
        br.links[id].lk = lockLen(s);
        br.links[id].la = true;
      }
    }
    const sh = autoShares(s);
    br.rate = { raider: 0, router: 0 };
    br.target ?? (br.target = { raider: "", router: "" });
    for (const k of ["raider", "router"]) {
      if (!sh[k]) {
        br.target[k] = "";
        continue;
      }
      const tgt = k === "raider" ? bestOpen(s) : null, wid = k === "router" ? worstLink(s) : null;
      br.target[k] = tgt ? tgt.to : wid ?? "";
      if (!br.target[k]) continue;
      const cost2 = tgt ? tgt.cost : upCost(s, br.links[wid].lv);
      const take = Math.min(prod * sh[k] * dt, Math.max(0, s.res.exotic), Math.max(0, cost2 - br.bank[k]));
      s.res.exotic -= take;
      br.bank[k] += take;
      br.rate[k] = take / dt;
      if (br.bank[k] >= cost2 * 0.9999) {
        br.bank[k] -= cost2;
        if (tgt) addLink(s, tgt.from, tgt.to);
        else br.links[wid].lv++;
        br.made[k]++;
      }
    }
    if (!br.fullSeen && br.n >= 1 && limiter(s)) br.fullSeen = true;
    if (!br.ty && br.n) {
      br.ty = {};
      for (const id in br.links) br.ty[NODE[id]?.type ?? "x"] = true;
    }
    let mx = br.maxLv ?? 0;
    for (const id in br.links) if (br.links[id].lv > mx) mx = br.links[id].lv;
    br.maxLv = mx;
    if (br.pass >= 0) {
      br.pass -= dt;
      if (br.pass <= 0) {
        br.pass = -1;
        br.done = true;
        if (s.chapterDone < 4) s.chapterDone = 4;
      }
    }
  }
  function bstageDef(s) {
    const d = BSTAGES[Math.min(s.bridge.stage, BSTAGES.length - 1)];
    return s.bridge.stage === 0 ? { ...d, needW: Math.max(d.needW, (s.bridge.holeW || 0) * 1.8) } : d;
  }
  function bstageReady(s, power2) {
    const d = bstageDef(s), last = s.bridge.stage >= BSTAGES.length - 1;
    const pw = power2 >= d.needW;
    const mission = s.bridge.stage !== 2 || !!s.visited.kilonova;
    const research = !last || !!s.r.passage;
    return { power: pw, mission, research, ok: ch4(s) && !s.bridge.done && s.bridge.pass < 0 && pw && mission && research };
  }
  function bstageAdvance(s, power2) {
    if (!bstageReady(s, power2).ok) return false;
    if (s.bridge.stage >= BSTAGES.length - 1) s.bridge.pass = NET.passSec;
    else s.bridge.stage++;
    return true;
  }
  var CH4_BUILDINGS = Object.keys(B).slice(Object.keys(B).indexOf("plate"));

  // src/core/engine.ts
  var keys = (o) => Object.keys(o);
  var DYSON_BOOST = 1.1;
  var TUNE = { g2: 1.125, boost: 1.085 };
  var DYSON_CH1_CHEAP = 20;
  var DYSON_CH1_DISCOUNT = 0.4;
  var CONVERTERS = ["smelter", "forge", "lab", "qcomp", "replicator", "sieve", "corono", "lifter", "separator", "seismo", "injector", "station", "hawking"];
  var CONVERTER_SCALES = { smelter: true, forge: true, sieve: true, lifter: true, separator: true, seismo: true, injector: true, hawking: true };
  var zeroRates = () => ({ ore: 0, metal: 0, energy: 0, data: 0, plasma: 0, exotic: 0 });
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
  var REBUILD_ON = false;
  var REDESIGN_MULT = 1.5;
  function prestigeMult(s) {
    if (!REBUILD_ON) return s.r.redesign ? REDESIGN_MULT : 1;
    return 1 + PRESTIGE.per * s.p.pts;
  }
  function prestigeTarget(s) {
    return s.p.run > PRESTIGE.metalUnit ? Math.floor(PRESTIGE.perOrder * Math.log10(s.p.run / PRESTIGE.metalUnit)) : 0;
  }
  function prestigeGain(s) {
    return Math.max(0, prestigeTarget(s) - s.p.pts);
  }
  var RING_BOOST = 1.1;
  var JET_BOOST = 1.1;
  var HOLE_BUILDINGS = ["scoop", "injector", "ring", "station", "jet", "hawking"];
  function phaseDef(s) {
    return PHASES[Math.min(s.hole.phase, PHASES.length - 1)];
  }
  function iscoR(a) {
    const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a));
    const z2 = Math.sqrt(3 * a * a + z1 * z1);
    return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
  }
  function diskEta(a) {
    return 1 - Math.sqrt(1 - 2 / (3 * iscoR(a)));
  }
  function feedRate(s) {
    return s.b.injector && !s.off.injector ? s.vent?.inj ?? 0 : 0;
  }
  function injEmitters(s) {
    const n = s.b.injector, k = n >= 1 ? Math.min(8, 2 + Math.floor(Math.log10(Math.max(1, n)) * 3)) : 0;
    return Array.from({ length: k }, (_, i) => i * (Math.PI * 2 / k) + 0.4);
  }
  function injDemand(s) {
    return s.b.injector ? consOf(s, "injector", "plasma") * s.b.injector : 0;
  }
  function holeLRaw(s) {
    return diskEta(s.hole.a) * ventFlow(s) * HOLE.c2;
  }
  function holeL(s) {
    const raw = holeLRaw(s) * ventHeatMult(s), edd = HOLE.eddW * ventOverMult(s) * ventHeatMult(s);
    if (raw <= edd) return raw;
    return s.r.slim ? edd * (1 + 2 * Math.log(raw / edd)) : edd;
  }
  function diskGain(s, kgs) {
    const heat = ventHeatMult(s), raw = holeLRaw(s) * heat, edd = HOLE.eddW * ventOverMult(s) * heat;
    const L2 = (r) => r <= edd ? r : s.r.slim ? edd * (1 + 2 * Math.log(r / edd)) : edd;
    const f = feedRate(s), perKg = f > 0 && raw > 0 ? raw / f : diskEta(s.hole.a) * HOLE.c2 * heat;
    return Math.max(0, L2(raw + kgs * perKg) - L2(raw));
  }
  function ringCov(s) {
    const f = HOLE.ringF * (s.r.wide ? 2 : 1) * (s.r.thick ? 2 : 1);
    return 1 - Math.exp(-s.b.ring * f);
  }
  function jetEta(s) {
    if (!s.r.mad) return 0;
    const a = s.hole.a / HOLE.spinMax;
    return 1.4 * a * a * (s.r.bz ? 2 : 1) * (s.r.penrose ? 2 : 1);
  }
  function jetP(s) {
    return jetEta(s) * ventFlow(s) * HOLE.c2;
  }
  function jetCov(s) {
    return s.off.jet ? 0 : 1 - Math.exp(-s.b.jet * HOLE.jetF);
  }
  function stationR(s) {
    return s.r.edge ? 1.01 : s.r.lower ? 1.2 : 3;
  }
  function gamma(s) {
    return 1 / Math.sqrt(1 - 1 / stationR(s));
  }
  function holeFb(s, k) {
    return Math.pow(Math.max(1, powerW(s) / HOLE.fbBase), k);
  }
  function spinRates(s) {
    const up = ventFlow(s) > 0 ? s.r.prograde ? 2 : 1 : 0;
    const down = s.b.jet && s.r.mad ? jetCov(s) * (s.r.penrose ? 0.5 : 1) : 0;
    return { up, down };
  }
  function spinEq(s) {
    const { up, down } = spinRates(s);
    return up + down ? HOLE.spinMax * up / (up + down) : s.hole.a;
  }
  function holeTick(s, dt) {
    if (!s.hole.started) {
      s.hole.started = true;
      add(s, "plasma", HOLE.startPlasma);
    }
    if (!s.hole.cap && holeLRaw(s) * ventHeatMult(s) >= HOLE.eddW * ventOverMult(s) * ventHeatMult(s)) s.hole.cap = true;
    const { up, down } = spinRates(s);
    const a = s.hole.a + HOLE.spinRate * dt * (up * (HOLE.spinMax - s.hole.a) - down * s.hole.a);
    s.hole.a = Math.max(0, Math.min(HOLE.spinMax, a));
    if (s.hole.dive >= 0) {
      s.hole.dive -= dt;
      if (s.hole.dive <= 0) {
        s.hole.dive = -1;
        s.hole.done = true;
        if (s.chapterDone < 3) s.chapterDone = 3;
      }
    }
  }
  function phaseReady(s) {
    const d = phaseDef(s), last = s.hole.phase >= PHASES.length - 1;
    const power2 = powerW(s) >= d.needW, research = !last || !!s.r.dive;
    return { power: power2, research, ok: s.star.done && !s.hole.done && s.hole.dive < 0 && power2 && research };
  }
  function advancePhase(s) {
    if (!phaseReady(s).ok) return false;
    if (s.hole.phase >= PHASES.length - 1) s.hole.dive = HOLE.diveSec;
    else s.hole.phase++;
    return true;
  }
  var VENT = {
    isco: 0.23,
    // vnitřní okraj disku v poloměrech disku (jen geometrie letu)
    fallIn: 0.085,
    // rychlost pádu dovnitř: dr/dt = −k·r^−½
    spin: 0.55,
    // úhlová rychlost na okraji disku (Kepler: ω ∝ r^−3/2)
    capSec: 40,
    // kapacita pasti v sekundách plnění
    valveSec: 2,
    // kolik sekund plnění je v jednom chuchvalci (jeden klik za ~2 s)
    share: 0.3,
    // jaký díl plynu z naběračů jde do pasti (+10 % za úroveň Sacích kanálů)
    tau: 90,
    // jak dlouho plyn v disku září, než spadne do díry (viskózní čas)
    dataPerJ: 1e19,
    // data ze záblesku: dataPerJ·√E
    heatPer: 0.035,
    // žár za záblesk (×násobič řetězu)
    heatDecay: 0.02,
    // chladnutí za sekundu
    heatBonus: 3,
    // výkon disku ×(1 + 3·žár)
    dataSec: 1,
    // záblesk dá data za tolik sekund běžné výroby
    pulse: 7.3,
    // perioda pulsu
    pulseWin: 1.1,
    // okno souzvuku po pulsu
    overSec: 15,
    // výbuch disku: jak dlouho je disk nad mezí
    overMult: 2,
    // a kolikrát víc září
    burstN: 14
  };
  var VENT_UPS = {
    inlet: { base: 15e7, g: 9, max: 5 },
    valve: { base: 3e8, g: 7, max: 12 },
    trap: { base: 5e8, g: 7, max: 12 },
    radius: { base: 2e9, g: 40, max: 5 },
    coil: { base: 6e9, g: 25, max: 6 }
  };
  var VENT_IDS = Object.keys(VENT_UPS);
  var ventLv = (s, id) => s.vent.lv[id] ?? 0;
  var ventOpen = (s) => s.star.done && !!s.r.accrete && !s.hole.done;
  var ventShare = (s, l = ventLv(s, "inlet")) => Math.min(0.8, VENT.share + 0.1 * l);
  function ventFill(s, l = ventLv(s, "inlet")) {
    const scoops = s.b.scoop ? prodOf(s, "scoop", "plasma") * s.b.scoop : 0;
    return Math.max(2e4, scoops) * ventShare(s, l);
  }
  var ventUnit = (s) => Math.max(2e4, s.b.scoop ? prodOf(s, "scoop", "plasma") * s.b.scoop : 0) * VENT.share;
  var ventCap = (s, l = ventLv(s, "trap")) => ventUnit(s) * VENT.capSec * Math.pow(1.6, l);
  var ventKg = (s, l = ventLv(s, "valve")) => Math.min(ventCap(s), ventUnit(s) * VENT.valveSec * Math.pow(1.5, l));
  var ventFlow = (s) => (s.vent.disk ?? 0) / VENT.tau;
  var ventR = (l) => 0.5 + l * 0.09;
  var ventChainMax = (l) => 8 + l * 4;
  var ventStep = (l) => 0.12 + l * 0.03;
  function ventFlight(r0) {
    return (Math.pow(r0, 1.5) - Math.pow(VENT.isco, 1.5)) / (1.5 * VENT.fallIn);
  }
  function blobPos(b, t2) {
    const k = 1.5 * VENT.fallIn, r15 = Math.max(Math.pow(VENT.isco, 1.5), Math.pow(b.r0, 1.5) - k * t2);
    const f = Math.max(1e-6, r15 / Math.pow(b.r0, 1.5));
    return { r: Math.pow(r15, 2 / 3), th: b.th0 - VENT.spin / k * Math.log(f) };
  }
  var ventChainMult = (s) => 1 + ventStep(ventLv(s, "coil")) * Math.max(0, Math.min(s.vent.chain, ventChainMax(ventLv(s, "coil"))) - 1);
  var ventHeatMult = (_s) => 1;
  var ventOverMult = (s) => s.vent.over > 0 ? VENT.overMult : 1;
  var pulsePhase = (s) => s.time % VENT.pulse;
  var ventGoldNow = (s) => pulsePhase(s) < VENT.pulseWin;
  function ventRelease(s, th, auto = false) {
    if (!ventOpen(s)) return null;
    const kg = ventKg(s);
    if (ventTankKg(s) < kg * 0.999) return null;
    s.vent.kg = Math.max(0, ventTankKg(s) - kg);
    if (!auto) {
      s.vent.man = (s.vent.man ?? 0) + kg / 3;
      chainUp(s);
    }
    const b = { t0: s.time, r0: ventR(ventLv(s, "radius")), th0: th, kg, mult: auto ? 1 : ventChainMult(s), gold: !auto && ventGoldNow(s), auto };
    s.vent.fly.push(b);
    return b;
  }
  var ventTankKg = (s) => Math.min(s.vent.kg ?? 0, ventCap(s));
  var ventTank = (s) => ventTankKg(s) / ventCap(s);
  var chained = (b) => !b.auto || !!b.inj;
  function chainUp(s) {
    s.vent.chain = s.vent.fly.some(chained) ? s.vent.chain + 1 : 1;
    s.vent.best = Math.max(s.vent.best, s.vent.chain);
  }
  function ventCanBurst(s) {
    return ventOpen(s) && ventTank(s) >= 0.999;
  }
  function ventBurst(s) {
    if (!ventCanBurst(s)) return false;
    const kg = ventTankKg(s) / VENT.burstN, r0 = ventR(ventLv(s, "radius"));
    for (let i = 0; i < VENT.burstN; i++) s.vent.fly.push({ t0: s.time, r0: r0 + i % 3 * 0.04, th0: i / VENT.burstN * Math.PI * 2, kg, mult: 1.5, gold: false, auto: true });
    s.vent.kg = 0;
    s.vent.over = VENT.overSec;
    return true;
  }
  function ventFlare(s, b) {
    const g = b.gold ? 2 : 1, w = b.kg * b.mult * g;
    const energy2 = diskEta(s.hole.a) * w * HOLE.c2;
    const data = Math.sqrt(energy2) * VENT.dataPerJ;
    add(s, "data", data);
    s.vent.disk = (s.vent.disk ?? 0) + w;
    return { b, data, energy: energy2 };
  }
  function baseDataRate(s) {
    let d = 0;
    for (const id of BUILDING_IDS) if (s.b[id] && B[id].prod?.data) d += prodOf(s, id, "data") * s.b[id] * effOf(s, id);
    return d;
  }
  var flares = [];
  function ventTick(s, dt) {
    const v = s.vent;
    if (!ventOpen(s)) return;
    const cap = ventCap(s);
    v.kg = Math.min(v.kg ?? 0, cap);
    if (v.kg < cap) {
      const take = Math.min(ventFill(s) * dt, cap - v.kg, Math.max(0, s.res.plasma));
      s.res.plasma -= take;
      v.kg += take;
    }
    if (s.b.injector && !s.off.injector) {
      const dem = injDemand(s), per = Math.max(Math.min(ventKg(s), dem * 1.5), dem / 4), em = injEmitters(s);
      const want = (v.injC ?? 0) + dem * dt;
      v.injC = Math.min(want, per * 2);
      let lost = Math.max(0, want - v.injC);
      let sent = 0;
      while (v.injC >= per && v.kg >= per * 0.2) {
        const kg = Math.min(per, v.kg);
        v.injC -= per;
        v.kg -= kg;
        sent += kg;
        lost += per - kg;
        v.injK = ((v.injK ?? 0) + 1) % em.length;
        chainUp(s);
        s.vent.fly.push({ t0: s.time, r0: ventR(ventLv(s, "radius")), th0: em[v.injK], kg, mult: ventChainMult(s), gold: ventGoldNow(s), auto: true, inj: true });
      }
      v.inj = (v.inj ?? 0) * (1 - Math.min(1, dt / 3)) + sent / 3;
      v.miss = (v.miss ?? 0) * (1 - Math.min(1, dt / 5)) + lost / 5;
      s.eff.injector = dem > 0 ? Math.max(0, 1 - v.miss / dem) : 1;
    } else v.inj = 0;
    v.man = (v.man ?? 0) * (1 - Math.min(1, dt / 3));
    if (v.over > 0) v.over = Math.max(0, v.over - dt);
    v.disk = Math.max(0, (v.disk ?? 0) - ventFlow(s) * dt);
    for (let i = v.fly.length - 1; i >= 0; i--) {
      const b = v.fly[i];
      if (s.time - b.t0 >= ventFlight(b.r0)) {
        v.fly.splice(i, 1);
        flares.push(ventFlare(s, b));
        if (flares.length > 40) flares.shift();
      }
    }
    if (v.chain && !v.fly.some(chained)) v.chain = 0;
  }
  function ventUpCost(s, id) {
    const u = VENT_UPS[id];
    return u.base * Math.pow(u.g, ventLv(s, id));
  }
  function ventUpgrade(s, id) {
    const c = ventUpCost(s, id);
    if (!ventOpen(s) || ventLv(s, id) >= VENT_UPS[id].max || s.res.plasma < c) return false;
    s.res.plasma -= c;
    s.vent.lv[id] = ventLv(s, id) + 1;
    return true;
  }
  function aldraAge(s) {
    if (s.star.done) return STAGES[STAGES.length - 1].age0 + STAGES[STAGES.length - 1].years;
    const d = stageDef(s);
    return d.age0 + d.years * Math.min(1, s.star.t / d.sec);
  }
  function yearsTick(s, dt) {
    if (s.yrs === void 0) {
      s.yrs1 = s.chapterDone ? 25 : void 0;
      s.yrs = !s.chapterDone ? s.time / 365.25 : s.yrs1 + aldraAge(s) - STAGES[0].age0;
    }
    if (!s.chapterDone) s.yrs += dt / 365.25;
    else {
      if (s.yrs1 === void 0) s.yrs1 = s.yrs;
      if (!s.star.done) s.yrs = s.yrs1 + aldraAge(s) - STAGES[0].age0;
      else s.yrs += dt / 365.25;
    }
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
      case "scoop":
        if (r.magscoop) m *= 3;
        if (v.cas) m *= 3;
        if (v.tde) m *= 4;
        if (v.oort) m *= 1.5;
        if (v.cloud) m *= 2;
        break;
      case "injector":
        if (r.mri) m *= 3;
        if (v.dwarf) m *= 1.5;
        break;
      case "station":
        if (r.pulse3) m *= 3;
        if (v.lens) m *= 4;
        if (r.fermi) m *= 10;
        if (v.pulsar) m *= 2;
        break;
      case "hawking":
        if (r.evap) m *= 4;
        if (v.ergo) m *= 3;
        break;
      case "plate":
        if (r.vacuum) m *= 3;
        break;
      case "beacon":
      case "gwdet":
      case "kcol":
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
    if (id === "scoop" || id === "injector" || id === "hawking") m *= Math.pow(RING_BOOST, s.b.ring) * Math.pow(JET_BOOST, s.b.jet);
    if (id === "plate" || id === "pump" || id === "kcol") m *= exoMult(s);
    if (id === "lifter" || id === "separator" || id === "seismo") {
      m *= Math.pow(TUNE.boost, s.b.dyson) * prestigeMult(s);
      if (id === "lifter" && s.star.collapse >= 0) m *= STAR.collapseLift;
    }
    if (B[id].prod?.energy && !HOLE_BUILDINGS.includes(id)) {
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
  function exoMult(s) {
    return Math.pow(s.r.pairs2 ? NET.pairM2 : NET.pairM, Math.floor(s.b.pair)) * Math.pow(1.12, countType(s, "neutron")) * (s.visited.magnetar ? 2 : 1);
  }
  var CH4_DATA = { beacon: 3e37, gwdet: 1e39, kcol: 1e38, pw0: 25e33, k: 0.5 };
  function dataMult4(s) {
    return Math.pow(Math.max(1, powerW(s) / CH4_DATA.pw0), CH4_DATA.k) * Math.pow(1.15, countType(s, "binary")) * (s.visited.flyby ? 2 : 1) * (s.visited.frb ? 3 : 1) * (s.r.shifted ? 4 : 1);
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
  var CH1_OLD = ["drone", "smelter", "solar", "lab", "drill", "mirror", "replicator", "forge", "catcher", "qcomp", "fusion"];
  var CH2_OLD = ["dyson", "windnet", "sieve", "corono", "lifter", "separator", "seismo", "swarmfab"];
  var RET = { off: false };
  function retired(s, id) {
    if (RET.off) return false;
    return s.chapterDone >= 1 && CH1_OLD.includes(id) || s.star.done && CH2_OLD.includes(id) || s.hole.done && (HOLE_BUILDINGS.includes(id) || id === "yard");
  }
  var SALVAGE = { metal: 0.5, dataSec: 120 };
  function salvageGain(s) {
    let metal = 0, data = 0;
    for (const id of CH1_OLD) {
      const n = Math.floor(s.b[id]), d = B[id];
      if (!n) continue;
      if (d.base.metal) metal += d.base.metal * (Math.pow(d.growth, n) - 1) / (d.growth - 1);
      if (d.prod?.data) data += d.prod.data * mult(s, id) * n;
    }
    return { metal: metal * SALVAGE.metal, data: data * SALVAGE.dataSec };
  }
  function salvageTick(s) {
    if (s.salvaged || !s.chapterDone || s.star.done) return;
    const g = salvageGain(s);
    add(s, "metal", g.metal);
    add(s, "data", g.data);
    s.salvaged = g;
  }
  function prodOf(s, id, r) {
    const base = B[id].prod?.[r];
    if (!base || retired(s, id)) return 0;
    let v = base * mult(s, id);
    if (id === "separator") v *= metallicity(s);
    if (id === "dyson") v *= dysonSat(s);
    if (id === "station") v *= gamma(s) * holeFb(s, HOLE.dataFb);
    if (id === "ring") return s.b.ring ? holeL(s) * ringCov(s) / s.b.ring : 0;
    if (id === "jet") return s.b.jet ? jetP(s) * jetCov(s) * (s.visited.pole ? 3 : 1) * (s.visited.stream ? 1.5 : 1) / s.b.jet : 0;
    if (id === "hawking") return consOf(s, "hawking", "plasma") * HOLE.c2 * (r === "data" ? HOLE.hawkData : 1);
    if (r === "data" && (id === "beacon" || id === "gwdet" || id === "kcol")) return CH4_DATA[id] * dataMult4(s) * (id === "kcol" ? Math.max(1, countType(s, "kilo")) : 1);
    if (id === "kcol") v *= Math.max(1, countType(s, "kilo"));
    return v;
  }
  function consOf(s, id, r) {
    if (id === "swarmfab") return r === "metal" || r === "energy" ? makesOf(s, id) * fabPriceFrac(s) * (cost(s, "dyson")[r] ?? 0) : 0;
    const base = B[id].cons?.[r];
    if (!base || retired(s, id)) return 0;
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
  function plasmaCap(s) {
    const use = ["separator", "sieve"].reduce((a, id) => a + consOf(s, id, "plasma") * s.b[id], 0);
    const next = Math.max(cost(s, "separator").plasma ?? 0, s.r.fab ? cost(s, "swarmfab").plasma ?? 0 : 0);
    return Math.max(1e10, 120 * use, 3 * next);
  }
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
  var YARD = { per: 0.1, max: 0.5, perTick: 3 };
  var yardShare = (s) => Math.min(YARD.max, YARD.per * Math.floor(s.b.yard ?? 0));
  function yardTarget(s) {
    let best = null, bc = Infinity;
    for (const id of ["ring", "jet"]) {
      if (!isUnlocked(s, id)) continue;
      const c = cost(s, id).plasma ?? Infinity;
      if (c < bc) {
        bc = c;
        best = id;
      }
    }
    return best;
  }
  function yardTick(s, dt) {
    const y = s.yard ?? (s.yard = { bank: 0, rate: 0, built: { ring: 0, jet: 0 }, target: null, eta: 0 });
    const n = Math.floor(s.b.yard ?? 0), target = yardTarget(s);
    if (!n || s.off.yard || !target || s.chapterDone >= 3 || s.hole.dive >= 0) {
      if (y.bank > 0) {
        s.res.plasma += y.bank;
        y.bank = 0;
      }
      y.rate = 0;
      y.target = null;
      y.eta = 0;
      s.eff.yard = n && !s.off.yard ? 0 : 1;
      return;
    }
    const { p, c } = rates(s);
    const net = Math.max(0, p.plasma - c.plasma);
    const take = Math.min(net * yardShare(s) * dt, Math.max(0, s.res.plasma));
    s.res.plasma -= take;
    y.bank += take;
    for (let k = 0; k < YARD.perTick; k++) {
      const id = yardTarget(s), price2 = id ? cost(s, id).plasma ?? Infinity : Infinity;
      if (!id || y.bank < price2) break;
      y.bank -= price2;
      s.b[id] += 1;
      s.bought[id] = (s.bought[id] ?? 0) + 1;
      y.built[id] += 1;
    }
    const next = yardTarget(s), price = next ? cost(s, next).plasma ?? 0 : 0;
    y.rate = y.rate * (1 - Math.min(1, dt / 3)) + take / 3;
    y.target = next;
    y.eta = y.rate > 0 ? Math.max(0, price - y.bank) / y.rate : Infinity;
    s.eff.yard = net > 0 ? 1 : 0;
  }
  var CHAIN_SHARE = 0.3;
  function chainTarget(s) {
    if (!s.b.lifter || !s.b.separator || !isUnlocked(s, "lifter") || !isUnlocked(s, "separator")) return null;
    if (s.off.lifter || s.off.separator) return null;
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
      if (!keys(cst).every((r) => f.bank[r] >= cst[r])) break;
      for (const r of keys(cst)) f.bank[r] -= cst[r];
      s.b[target] += 1;
      s.bought[target] = (s.bought[target] ?? 0) + 1;
      f.built[target] += 1;
    }
    const need = cost(s, target);
    for (const r of ["metal", "energy", "plasma"]) if (!(r in need) && f.bank[r] > 0) {
      s.res[r] += f.bank[r];
      f.bank[r] = 0;
    }
  }
  function powerW(s) {
    let w = reactorW(s) + (s.bridge?.started ? s.bridge.holeW + netPower(s) : 0);
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
      for (const r of keys(B[id].prod ?? {})) p[r] += prodOf(s, id, r) * n * e;
      if (id !== "injector") for (const r of keys(B[id].cons ?? {})) c[r] += consOf(s, id, r) * n * e;
    }
    if (s.r.auto && !s.chapterDone) p.ore += clickPower(s) * RULES.autoClicksPerSec;
    if (ventOpen(s) && ventTank(s) < 0.999) c.plasma += ventFill(s);
    if (s.bridge?.started) {
      p.energy += s.bridge.holeW + netPower(s);
      const r = s.bridge.rate;
      if (r) c.exotic += r.raider + r.router;
    }
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
    if (r === "ore" && s.r.auto && !s.chapterDone) prod.push(["auto", clickPower(s) * RULES.autoClicksPerSec]);
    if (r === "energy" && s.bridge?.started) prod.push(["home", s.bridge.holeW], ["net", netPower(s)]);
    if (r === "exotic" && s.bridge?.rate) {
      if (s.bridge.rate.raider) cons.push(["raider", s.bridge.rate.raider]);
      if (s.bridge.rate.router) cons.push(["router", s.bridge.rate.router]);
    }
    return { prod, cons };
  }
  function add(s, r, v) {
    s.res[r] += v;
    s.total[r] += v;
  }
  function cost(s, id, n = s.bought[id] ?? Math.floor(s.b[id])) {
    const d = B[id], o = {};
    const extra = id === "dyson" && s.p.base >= 0 ? Math.pow(TUNE.g2 / d.growth, Math.max(0, n - s.p.base)) : 1;
    const ch1 = id === "dyson" && !s.chapterDone && n < DYSON_CH1_CHEAP ? DYSON_CH1_DISCOUNT : 1;
    for (const r of keys(d.base)) o[r] = d.base[r] * Math.pow(d.growth, n) * extra * (r === "metal" ? ch1 : 1);
    return o;
  }
  function affordable(s, c) {
    return keys(c).every((r) => s.res[r] >= c[r]);
  }
  function pay(s, c) {
    for (const r of keys(c)) s.res[r] -= c[r];
  }
  function isUnlocked(s, id) {
    return !retired(s, id) && B[id].unlock(s);
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
      for (const r of keys(c)) s.res[r] += c[r] * SELL_REFUND;
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
      if (!all && !keys(c).every((r) => res[r] >= c[r])) break;
      for (const r of keys(c)) {
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
      for (const r of keys(d.prod ?? {})) add(s, r, prodOf(s, id, r) * n * dt);
      if (d.makes && !d.cons) s.b[d.makes.building] += makesOf(s, id) * Math.floor(n) * dt;
    }
    if (s.r.auto && !s.chapterDone) add(s, "ore", clickPower(s) * RULES.autoClicksPerSec * dt);
    for (const id of CONVERTERS) {
      if (id === "injector") continue;
      const d = B[id], n = s.b[id];
      if (!n || s.off[id]) {
        s.eff[id] = n ? 0 : 1;
        continue;
      }
      const need = keys(d.cons).map((r) => [r, consOf(s, id, r) * n * dt]);
      let e = 1;
      for (const [r, v] of need) if (v > 0) e = Math.min(e, s.res[r] / v);
      if (id === "lifter") {
        const room = plasmaCap(s) - s.res.plasma, made1 = prodOf(s, id, "plasma") * n * dt;
        if (made1 > 0) e = Math.min(e, Math.max(0, room / made1));
      }
      e = Math.max(0, Math.min(1, e));
      const out = keys(d.prod ?? {}).map((r) => [r, prodOf(s, id, r) * n * dt * e]);
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
    if (s.star.done) yardTick(s, dt);
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
    salvageTick(s);
    yearsTick(s, dt);
    if (s.star.done && !s.hole.done) {
      holeTick(s, dt);
      ventTick(s, dt);
    }
    if (ch4(s)) {
      bridgeStart(s);
      bridgeTick(s, dt, exoticProd(s, (id, r) => prodOf(s, id, r)));
    }
    return checkJournal(s);
  }
  function bridgeStart(s) {
    if (s.bridge.started) return;
    RET.off = true;
    const holeW = powerW(s) - reactorW(s), data = baseDataRate(s) * NET.holeData;
    RET.off = false;
    s.bridge.holeW = holeW;
    s.bridge.started = true;
    add(s, "data", data);
    add(s, "exotic", NET.startExotic);
    s.bridge.archive = data;
    if (s.event?.id === "clump") s.event = null;
  }
  function bridgeReady(s) {
    return bstageReady(s, powerW(s));
  }
  function bridgeAdvance(s) {
    return bstageAdvance(s, powerW(s));
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
    return REBUILD_ON && !!s.r.redesign && !s.star.done && s.star.collapse < 0 && prestigeGain(s) >= 1;
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
  var zero = (keys2) => Object.fromEntries(keys2.map((k) => [k, 0]));
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
      hole: { a: 0.2, phase: 0, dive: -1, done: false, started: false },
      vent: { tank: 0, kg: 0, fall: 0, chain: 0, best: 0, heat: 0, over: 0, auto: 0, lv: {}, fly: [] },
      bridge: { started: false, holeW: 0, links: {}, n: 0, stage: 0, pass: -1, done: false, locks: 0, lv: {}, bank: { raider: 0, router: 0 }, made: { raider: 0, router: 0 } },
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
    const n = Math.min(Math.floor(drones), 24), pos2 = [];
    for (let i = 0; i < n; i++) {
      const rad = R0 * (1.04 + i % 5 * 0.05), sp = 0.25 + i % 7 * 0.04, a = i * 2.39996 + (reduce ? 0 : clock * sp) * (i % 2 ? 1 : -1);
      const tilt = 0.32 + i % 3 * 0.08, ox = Math.cos(a) * rad, oy = Math.sin(a) * rad * tilt;
      const rot = i % 4 * 0.5 - 0.6, rx = ox * Math.cos(rot) - oy * Math.sin(rot), ry = ox * Math.sin(rot) + oy * Math.cos(rot);
      pos2.push([cx + rx, cx + ry, Math.sin(a) < 0, i]);
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
    pos2.filter((p) => p[2]).forEach(drawDrone);
    const sc = 1 - pulse * 0.035;
    x.save();
    x.translate(cx, cx);
    x.scale(sc, sc);
    x.drawImage(tex, -cx, -cx, W, W);
    x.translate(-cx, -cx);
    drawPlatform(x, cx, R0, clock);
    x.restore();
    pos2.filter((p) => !p[2]).forEach(drawDrone);
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
      const neb2 = x.createRadialGradient(cx, cy, sc * 0.05, cx, cy, sc * 0.3);
      neb2.addColorStop(0, "rgba(80,200,190,0.10)");
      neb2.addColorStop(0.6, "rgba(255,90,110,0.14)");
      neb2.addColorStop(1, "rgba(255,90,110,0)");
      x.fillStyle = neb2;
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
    const label22 = (id, px, py, rad) => {
      const lx = px + rad + 10, ly2 = py - rad - 8;
      x.strokeStyle = "rgba(170,180,230,0.35)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(px + rad * 0.7, py - rad * 0.7);
      x.lineTo(lx - 2, ly2 + 3);
      x.lineTo(lx + 2, ly2 + 3);
      x.stroke();
      x.fillStyle = s.visited[id] ? "#e1e4f4" : "#8a90b8";
      x.fillText(t_(id) + (s.visited[id] ? "" : " ?"), lx + 4, ly2 + 6);
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
        label22("core", px, py, rad);
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
        label22(id, px, py, rad);
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
        label22(id, px, py, rad);
      } else {
        const rad = 4;
        litSphere(x, px, py, rad, cx, cy, ["#d9b394", "#8a6a55", "#2a1f1d"]);
        const on = reduce || time % 1.6 < 0.25;
        x.fillStyle = on ? "rgba(255,179,92,1)" : "rgba(255,179,92,0.35)";
        x.beginPath();
        x.arc(px + 1.5, py - 1.5, on ? 1.4 : 0.9, 0, 7);
        x.fill();
        label22(id, px, py, rad);
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
      label22("ione", px, py, 3.2);
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
      label22("kuiper", px, py, 2.4);
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
      label22("dust", px, py, 2);
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
  function bakeStar(px, stage22) {
    const p = PAL[stage22], out = [];
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
        const limb = stage22 === "ms" ? 0.4 + 0.55 * Math.pow(mu, 0.5) : 0.22 + 0.74 * Math.pow(mu, 0.8);
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
    const pos2 = (i) => {
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
        const [px2, py, sn] = pos2(i);
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
  function drawOnion(x, W, H, m, stage22, title, tt) {
    const L2 = LAYERS[stage22];
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
      const ly2 = top + i * 16, w = x.measureText(name).width;
      x.fillStyle = col;
      x.fillRect(lx - 9, ly2 - 4, 8, 8);
      x.strokeStyle = "rgba(255,255,255,0.3)";
      x.lineWidth = 0.5;
      x.strokeRect(lx - 9, ly2 - 4, 8, 8);
      x.fillStyle = "rgba(225,228,244,0.92)";
      x.fillText(name, lx - 14 - w, ly2);
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
  function drawSection(c, stage22, time, collapse, labels) {
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
    const Ls = LAYERS[stage22];
    if (!Ls) return;
    const tt = reduce ? 0 : time, p = PAL[stage22] ?? PAL.si;
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
    const px = Math.min(720, Math.round(r * 2 * dpr)), sk = `${stage22}:${px}`;
    if (!secTex || secKey !== sk) {
      secTex = bakeStar(px, stage22);
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
      const sx = ox + Math.cos(a) * mid, sy = oy + Math.sin(a) * mid, ly2 = top + i * gap;
      x.strokeStyle = "rgba(225,228,244,0.4)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(sx, sy);
      x.lineTo(lx - 24, ly2);
      x.lineTo(lx - 10, ly2);
      x.stroke();
      x.fillStyle = "rgba(255,255,255,0.95)";
      x.beginPath();
      x.arc(sx, sy, 2, 0, 7);
      x.fill();
      const base = hexRgb(col);
      x.fillStyle = rgb(mix(base, hot, 0.3));
      x.beginPath();
      x.arc(lx, ly2, 5.5, 0, 7);
      x.fill();
      x.strokeStyle = "rgba(255,255,255,0.4)";
      x.stroke();
      x.fillStyle = "rgba(232,234,248,0.96)";
      x.fillText(name, lx + 14, ly2);
    });
    x.textBaseline = "alphabetic";
    label(x, labels.title, labels.sub);
  }

  // src/ui/hole.ts
  var reduce2 = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MONO = '"JetBrains Mono", ui-monospace, monospace';
  var DISK = [
    [[255, 196, 140], [214, 104, 58], [110, 40, 34]],
    [[255, 236, 200], [255, 160, 82], [170, 62, 38]],
    [[248, 246, 255], [255, 196, 128], [196, 86, 52]],
    [[240, 244, 255], [255, 204, 140], [200, 92, 60]],
    [[236, 240, 255], [255, 210, 150], [204, 96, 66]]
  ];
  var lerp2 = (a, b, k) => a + (b - a) * k;
  var mixc = (a, b, k) => a.map((v, i) => Math.round(lerp2(v, b[i], k)));
  var diskTex = null;
  var diskKey = "";
  function bakeDisk(px, phase2) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = px;
    const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
    const pal = DISK[phase2], rin = 0.2, patchy = phase2 === 0 ? 0.75 : 0.35;
    for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
      const u = (i - c) / c, v = (j - c) / c, r = Math.hypot(u, v);
      if (r > 1 || r < rin * 0.85) continue;
      const th = Math.atan2(v, u), q = (r - rin) / (1 - rin);
      const sw = th + 2.4 * Math.log(r + 0.05);
      const streak = sfbm(Math.cos(sw) * 2.2 + r * 9, Math.sin(sw) * 2.2 + r * 9, 5);
      const fine = sfbm(Math.cos(sw * 3) * 6 + 40, Math.sin(sw * 3) * 6 + r * 30, 3);
      const fall = Math.pow(Math.max(0, 1 - q), 1.6) * (q < 0 ? Math.max(0, 1 + q * 8) : 1);
      let b = fall * (1 - patchy + patchy * (streak * 1.25 + fine * 0.35));
      b = Math.max(0, Math.min(1.2, b * 1.25));
      const col = q < 0.35 ? mixc(pal[0], pal[1], Math.max(0, q) / 0.35) : mixc(pal[1], pal[2], (q - 0.35) / 0.65);
      const o = (j * px + i) * 4, lift = Math.max(0, b - 1) * 200;
      d[o] = Math.min(255, col[0] + lift);
      d[o + 1] = Math.min(255, col[1] + lift);
      d[o + 2] = Math.min(255, col[2] + lift);
      const edge = Math.min(1, (1 - r) * 14) * Math.min(1, (r - rin * 0.85) * 30);
      d[o + 3] = Math.min(255, 255 * Math.min(1, b) * edge);
    }
    x.putImageData(img, 0, 0);
    return cv;
  }
  var bgCache = /* @__PURE__ */ new Map();
  function bgFor(W, H, dpr) {
    const key = `${W}x${H}@${dpr}`;
    let b = bgCache.get(key);
    if (!b) {
      if (bgCache.size > 6) bgCache.clear();
      b = bakeMapBg(W, H, dpr);
      bgCache.set(key, b);
    }
    return b;
  }
  var layer = null;
  var neb = null;
  var nebKey2 = "";
  function prep(c) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return null;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    const x = c.getContext("2d");
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { x, W, H, dpr };
  }
  function nebula(px) {
    if (!neb || nebKey2 !== String(px)) {
      neb = bakeNebula(px);
      nebKey2 = String(px);
    }
    return neb;
  }
  function drawHole(c, v, time, sub, full = false, tilt) {
    const p = prep(c);
    if (!p) return;
    const { x, W, H, dpr } = p, tt = reduce2 ? 0 : time, m = tilt ? Math.min(W, H * 1.15) : Math.min(W, H);
    if (full) {
      x.drawImage(bgFor(W, H, dpr), 0, 0, W, H);
    } else x.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H * 0.5, Rsh = m * 0.095, Rout = m * 0.43, incl = tilt ?? 0.2 + v.phase * 0.012;
    const pal = DISK[v.phase];
    const nr = m * 0.62, npx = Math.min(640, Math.round(nr * 2 * dpr));
    x.globalAlpha = 0.22;
    x.save();
    x.translate(cx, cy);
    x.rotate(tt * 2e-3);
    x.drawImage(nebula(npx), -nr, -nr, nr * 2, nr * 2);
    x.restore();
    x.globalAlpha = 1;
    const glowA = 0.1 + v.lum * 0.25;
    const halo = x.createRadialGradient(cx, cy, Rsh, cx, cy, Rout * 1.15);
    halo.addColorStop(0, `rgba(${pal[1].join(",")},${glowA})`);
    halo.addColorStop(0.4, `rgba(${pal[2].join(",")},${glowA * 0.35})`);
    halo.addColorStop(1, `rgba(${pal[2].join(",")},0)`);
    x.fillStyle = halo;
    x.fillRect(0, 0, W, H);
    const tpx = Math.min(900, Math.round(Rout * 2 * dpr)), tkey = `${v.phase}:${tpx}`;
    if (!diskTex || diskKey !== tkey) {
      diskTex = bakeDisk(tpx, v.phase);
      diskKey = tkey;
    }
    const rot = tt * 0.09, alpha = 0.55 + v.lum * 0.45;
    const rinPx = Math.max(Rsh * 1.04, iscoR(v.a) / 5.2 * Rsh), texIn = 0.2;
    const scaleR = Math.max(Rout, rinPx / texIn);
    if (!layer) layer = document.createElement("canvas");
    if (layer.width !== c.width || layer.height !== c.height) {
      layer.width = c.width;
      layer.height = c.height;
    }
    const lx = layer.getContext("2d");
    const disk = (half) => {
      lx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lx.globalCompositeOperation = "source-over";
      lx.clearRect(0, 0, W, H);
      lx.save();
      lx.beginPath();
      if (half === "back") lx.rect(0, 0, W, cy);
      else lx.rect(0, cy, W, H - cy);
      lx.clip();
      lx.translate(cx, cy);
      lx.scale(1, incl);
      lx.rotate(rot);
      lx.drawImage(diskTex, -scaleR, -scaleR, scaleR * 2, scaleR * 2);
      lx.restore();
      lx.globalCompositeOperation = "source-atop";
      const dg = lx.createLinearGradient(cx - scaleR, cy, cx + scaleR, cy);
      dg.addColorStop(0, `rgba(235,242,255,${0.35 + v.lum * 0.2})`);
      dg.addColorStop(0.42, "rgba(255,255,255,0)");
      dg.addColorStop(0.58, "rgba(20,6,12,0)");
      dg.addColorStop(1, "rgba(20,6,12,0.6)");
      lx.fillStyle = dg;
      lx.fillRect(0, 0, W, H);
      lx.globalCompositeOperation = "source-over";
      x.save();
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.globalAlpha = alpha * (half === "back" ? 0.8 : 1);
      x.drawImage(layer, 0, 0);
      x.restore();
    };
    {
      const la = (0.3 + v.lum * 0.55) * (v.phase === 0 ? 0.55 : 1), r0 = Rsh * 1.02, r1 = Rsh * 1.75;
      const lg = x.createRadialGradient(cx, cy, r0, cx, cy, r1);
      lg.addColorStop(0, `rgba(${pal[0].join(",")},${la})`);
      lg.addColorStop(0.25, `rgba(${pal[1].join(",")},${la * 0.6})`);
      lg.addColorStop(1, `rgba(${pal[2].join(",")},0)`);
      x.fillStyle = lg;
      x.beginPath();
      x.arc(cx, cy, r1, 0, 7);
      x.arc(cx, cy, r0, 0, 7, true);
      x.fill();
      x.save();
      x.beginPath();
      x.rect(0, 0, W, cy - Rsh * 0.2);
      x.clip();
      x.globalAlpha = 0.7;
      x.fillStyle = lg;
      x.beginPath();
      x.ellipse(cx, cy, r1 * 0.95, r1 * 0.9, 0, 0, 7);
      x.arc(cx, cy, r0, 0, 7, true);
      x.fill();
      x.restore();
      x.globalAlpha = 1;
    }
    if (v.phase >= 4) {
      const eg = x.createRadialGradient(cx, cy, Rsh * 0.95, cx, cy, Rsh * 1.5);
      eg.addColorStop(0, "rgba(184,146,255,0.32)");
      eg.addColorStop(1, "rgba(184,146,255,0)");
      x.fillStyle = eg;
      x.beginPath();
      x.ellipse(cx, cy, Rsh * 1.5, Rsh * 1.32, 0, 0, 7);
      x.fill();
      for (let i = 0; i < 26; i++) {
        const a = i * 2.399 + tt * (0.6 + i % 3 * 0.2), rr = Rsh * (1.08 + i % 5 * 0.07);
        x.fillStyle = `rgba(214,196,255,${0.25 + 0.5 * Math.max(0, Math.sin(tt * 2 + i))})`;
        x.fillRect(cx + Math.cos(a) * rr - 0.8, cy + Math.sin(a) * rr * 0.88 - 0.8, 1.6, 1.6);
      }
    }
    disk("back");
    const jet = (dir) => {
      if (v.jets <= 0) return;
      const len = m * (0.28 + 0.22 * v.jets), w0 = Rsh * 0.22, w1 = Rsh * (0.7 + 0.5 * v.jets);
      const y0 = cy - dir * Rsh * 0.5, y1 = y0 - dir * len;
      const g = x.createLinearGradient(cx, y0, cx, y1);
      g.addColorStop(0, `rgba(196,214,255,${0.55 * v.jets + 0.15})`);
      g.addColorStop(0.35, `rgba(150,150,255,${0.22 * v.jets + 0.06})`);
      g.addColorStop(1, "rgba(140,120,255,0)");
      x.fillStyle = g;
      x.beginPath();
      x.moveTo(cx - w0, y0);
      x.quadraticCurveTo(cx - w1 * 0.4, (y0 + y1) / 2, cx - w1, y1);
      x.lineTo(cx + w1, y1);
      x.quadraticCurveTo(cx + w1 * 0.4, (y0 + y1) / 2, cx + w0, y0);
      x.closePath();
      x.fill();
      for (let k = 0; k < 6; k++) {
        const f = ((tt * 0.35 + k / 6) % 1 + 1) % 1, yy = y0 - dir * len * f, ww = lerp2(w0, w1, f) * 0.35;
        x.fillStyle = `rgba(226,232,255,${(1 - f) * 0.7 * (0.4 + v.jets * 0.6)})`;
        x.beginPath();
        x.ellipse(cx, yy, ww, ww * 0.5, 0, 0, 7);
        x.fill();
      }
      const nl = Math.round(v.jetCov * 5);
      for (let k = 0; k < nl; k++) {
        const f = 0.3 + k * 0.13, yy = y0 - dir * len * f, ww = lerp2(w0, w1, f) * 1.25;
        x.strokeStyle = "rgba(242,178,90,0.7)";
        x.lineWidth = 1.2;
        x.beginPath();
        x.ellipse(cx, yy, ww, ww * 0.18, 0, 0, 7);
        x.stroke();
      }
    };
    jet(-1);
    const sg = x.createRadialGradient(cx, cy, Rsh * 0.7, cx, cy, Rsh * 1.04);
    sg.addColorStop(0, "#000000");
    sg.addColorStop(0.92, "#020205");
    sg.addColorStop(1, "rgba(2,2,5,0)");
    x.fillStyle = sg;
    x.beginPath();
    x.arc(cx, cy, Rsh * 1.04, 0, 7);
    x.fill();
    x.strokeStyle = `rgba(255,240,220,${0.5 + v.lum * 0.45})`;
    x.lineWidth = 1.2;
    x.beginPath();
    x.arc(cx, cy, Rsh * 1.05, 0, 7);
    x.stroke();
    x.strokeStyle = `rgba(255,220,180,${0.12 + v.lum * 0.15})`;
    x.lineWidth = 3;
    x.beginPath();
    x.arc(cx, cy, Rsh * 1.09, 0, 7);
    x.stroke();
    jet(1);
    const ns = Math.min(12, v.stations);
    for (let i = 0; i < ns; i++) {
      const a = i / ns * Math.PI * 2 + tt * 0.25 / v.gamma, rr = Rsh * (1.16 + 0.5 / v.gamma);
      const sx = cx + Math.cos(a) * rr, sy = cy + Math.sin(a) * rr * 0.35;
      if (Math.sin(a) < 0 && Math.abs(sx - cx) < Rsh) continue;
      x.fillStyle = "rgba(127,211,234,0.95)";
      x.fillRect(sx - 1.2, sy - 1.2, 2.4, 2.4);
    }
    disk("front");
    for (let j = 0; j < v.feed; j++) {
      for (let q = 0; q < 9; q++) {
        const f = ((tt * 0.12 + q / 9 + j * 0.37) % 1 + 1) % 1;
        const a = j * 2.2 + f * 2.6, rr = lerp2(m * 0.62, Rout * 0.9, f);
        const sx = cx + Math.cos(a) * rr, sy = cy + Math.sin(a) * rr * incl * 1.4;
        x.fillStyle = `rgba(255,${180 + q * 6},${150 + q * 8},${f * 0.55})`;
        x.beginPath();
        x.arc(sx, sy, 0.8 + f * 1.1, 0, 7);
        x.fill();
      }
    }
    const nr2 = Math.min(4, Math.ceil(v.rings / 15));
    for (let k = 0; k < nr2; k++) {
      const rr = Rout * (1.04 + k * 0.08);
      x.strokeStyle = `rgba(242,178,90,${0.12 + v.cov * 0.12})`;
      x.lineWidth = 1;
      x.beginPath();
      x.ellipse(cx, cy, rr, rr * incl, 0, 0, 7);
      x.stroke();
    }
    const nd = Math.min(90, v.rings);
    for (let i = 0; i < nd; i++) {
      const k = i % Math.max(1, nr2), a = i * 2.39996 + tt * (0.05 + k * 0.01), rr = Rout * (1.04 + k * 0.08);
      const sn = Math.sin(a), px = cx + Math.cos(a) * rr, py = cy + sn * rr * incl;
      const gl = 0.5 + 0.5 * Math.max(0, Math.cos(i * 1.7 + tt * 0.8));
      x.fillStyle = sn >= 0 ? `rgba(255,${190 + gl * 50},${120 + gl * 80},${0.6 + gl * 0.4})` : "rgba(200,150,100,0.35)";
      x.fillRect(px - 1.3, py - 0.7, 2.6, 1.4);
    }
    if (v.dive >= 0) {
      const f = 1 - v.dive / 30, a = f * 14, rr = lerp2(Rout * 0.8, Rsh * 1.5, Math.pow(f, 0.7));
      const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr * 0.5;
      x.fillStyle = "#f2a541";
      x.beginPath();
      x.arc(px, py, 2.2, 0, 7);
      x.fill();
      const pr = tt * 0.137 % 1 * Rout;
      x.strokeStyle = `rgba(242,165,65,${0.4 * (1 - pr / Rout)})`;
      x.lineWidth = 1;
      x.beginPath();
      x.arc(cx, cy, Rsh + pr, 0, 7);
      x.stroke();
    }
    if (sub) {
      x.font = `600 12px ${MONO}`;
      x.textAlign = "center";
      x.fillStyle = "rgba(242,178,90,0.95)";
      x.fillText(sub, cx, H - 10);
      x.textAlign = "left";
    }
  }
  var rays = null;
  function bakeRays() {
    const out = [];
    for (const b of [-4.6, -3.3, -2.66, -2.605, -1.7, 1.2, 2.61, 2.7, 3.6, 5.2]) {
      let px = -9, py = b, vx = 1, vy = 0;
      const Lm = Math.abs(px * vy - py * vx), pts = [[px, py]];
      let cap = false;
      for (let i = 0; i < 9e3; i++) {
        const r = Math.hypot(px, py);
        if (r < 1) {
          cap = true;
          break;
        }
        if (px > 9 || Math.abs(py) > 7 || r > 12) break;
        const dt = Math.min(0.02, 4e-3 * r * r);
        const k = -1.5 * Lm * Lm / Math.pow(r, 5);
        vx += k * px * dt;
        vy += k * py * dt;
        const n = Math.hypot(vx, vy);
        vx /= n;
        vy /= n;
        px += vx * dt;
        py += vy * dt;
        if (i % 3 === 0) pts.push([px, py]);
      }
      out.push({ pts, cap });
    }
    return out;
  }
  function rsText(x, v, px, py) {
    const s = v.toFixed(2).replace(".", ",") + " r";
    x.fillText(s, px, py);
    const w = x.measureText(s).width, f = x.font;
    x.font = f.replace(/(\d+)px/, (_m, n) => `${Math.round(Number(n) * 0.75)}px`);
    x.fillText("s", px + w, py + 3);
    x.font = f;
    return w + 7;
  }
  function drawProfile(c, v, time, title) {
    const p = prep(c);
    if (!p) return;
    const { x, W, H, dpr } = p, tt = reduce2 ? 0 : time;
    x.drawImage(bgFor(W, H, dpr), 0, 0, W, H);
    const narrow = W < 560, legW = narrow ? 0 : 214;
    const a = v.a, rp = 0.5 * (1 + Math.sqrt(1 - a * a));
    const rph = 1 + Math.cos(2 / 3 * Math.acos(-a));
    const ris = iscoR(a) / 2, rst = v.stationR, rmax = Math.max(3.1, rst + 0.1);
    const cx = narrow ? W * 0.42 : (W - legW) * 0.42, cy = H * 0.5;
    const u = Math.min((W - legW - cx - 24) / rmax, H * 0.36);
    const P = (rx, ry2) => [cx + rx * u, cy + ry2 * u];
    const pal = DISK[v.phase];
    x.save();
    x.beginPath();
    x.rect(0, 0, W - legW, H);
    x.clip();
    const sag = (r) => 2 * Math.sqrt(Math.max(0, r - 1));
    const zMax = sag(7);
    for (let i = 0; i < 9; i++) {
      const r = 1.15 + i * i * 0.09 + i * 0.35, dz = (zMax - sag(r)) * 0.11 * u;
      x.strokeStyle = `rgba(150,140,230,${0.03 + (1 - i / 9) * 0.06})`;
      x.lineWidth = 1;
      x.beginPath();
      x.ellipse(cx, cy + dz, r * u, r * u * 0.16, 0, 0, Math.PI);
      x.stroke();
    }
    for (let k = 0; k < 14; k++) {
      const ang = k / 14 * Math.PI;
      x.strokeStyle = "rgba(150,140,230,0.07)";
      x.beginPath();
      for (let r = 1.15; r < 7; r += 0.2) {
        const dz = (zMax - sag(r)) * 0.11 * u, px2 = cx + Math.cos(ang) * r * u, py2 = cy + dz + Math.sin(ang) * r * u * 0.16;
        r === 1.15 ? x.moveTo(px2, py2) : x.lineTo(px2, py2);
      }
      x.stroke();
    }
    x.restore();
    if (!rays) rays = bakeRays();
    const shrink = (r) => r + (rph - 1.5) * Math.exp(-(r - 1.5) / 1.6);
    const map = (q) => {
      const r = Math.hypot(q[0], q[1]) || 1, r2 = shrink(r);
      return P(q[0] / r * r2, q[1] / r * r2);
    };
    x.save();
    x.beginPath();
    x.rect(0, 0, W - legW, H);
    x.clip();
    for (const ray of rays) {
      x.strokeStyle = ray.cap ? "rgba(255,214,170,0.16)" : "rgba(220,226,255,0.16)";
      x.lineWidth = 1;
      x.beginPath();
      let started = false;
      for (const q2 of ray.pts) {
        const r = Math.hypot(q2[0], q2[1]);
        if (shrink(r) < rp) break;
        const [sx, sy] = map(q2);
        if (!started) {
          x.moveTo(sx, sy);
          started = true;
        } else x.lineTo(sx, sy);
      }
      x.stroke();
      const n = ray.pts.length, f = ((tt * 0.09 + ray.pts[0][1] * 0.13) % 1 + 1) % 1, q = ray.pts[Math.floor(f * (n - 1))];
      if (shrink(Math.hypot(q[0], q[1])) > rp) {
        const [sx, sy] = map(q);
        x.fillStyle = ray.cap ? "rgba(255,214,170,0.85)" : "rgba(226,232,255,0.85)";
        x.beginPath();
        x.arc(sx, sy, 1.3, 0, 7);
        x.fill();
      }
    }
    x.restore();
    const th = u * (0.035 + v.phase * 0.022);
    for (const sgn of [-1, 1]) {
      const x0 = cx + sgn * ris * u, x1 = sgn > 0 ? W - legW - 6 : 6;
      const g = x.createLinearGradient(x0, 0, x1, 0), boost = sgn < 0 ? 1 : 0.7;
      g.addColorStop(0, `rgba(${pal[0].join(",")},${(0.6 + v.lum * 0.4) * boost})`);
      g.addColorStop(0.18, `rgba(${pal[1].join(",")},${(0.45 + v.lum * 0.3) * boost})`);
      g.addColorStop(1, `rgba(${pal[2].join(",")},0.04)`);
      x.fillStyle = g;
      x.beginPath();
      x.moveTo(x0, cy - th * 0.35);
      x.quadraticCurveTo((x0 + x1) / 2, cy - th * 1.5, x1, cy - th * 2.3);
      x.lineTo(x1, cy + th * 2.3);
      x.quadraticCurveTo((x0 + x1) / 2, cy + th * 1.5, x0, cy + th * 0.35);
      x.closePath();
      x.fill();
      for (let k = 0; k < 7; k++) {
        const f = ((tt * 0.07 * (1 + k * 0.13) + k / 7) % 1 + 1) % 1, rr = lerp2(4.6, ris, f * f);
        const [hx, hy] = P(sgn * rr, Math.sin(k * 3.1 + tt) * 0.02 * rr);
        if (hx < 6 || hx > W - legW - 6) continue;
        x.fillStyle = `rgba(${pal[0].join(",")},${0.15 + f * 0.6})`;
        x.beginPath();
        x.ellipse(hx, hy, 1.6 + f * 2.2, 0.8 + f * 0.6, 0, 0, 7);
        x.fill();
      }
    }
    if (v.jets > 0) for (const dir of [-1, 1]) {
      const y1 = dir < 0 ? 4 : H - 4, w1 = u * (0.35 + 0.45 * v.jets);
      const g = x.createLinearGradient(cx, cy, cx, y1);
      g.addColorStop(0, `rgba(196,214,255,${0.5 * v.jets + 0.12})`);
      g.addColorStop(1, "rgba(140,120,255,0)");
      x.fillStyle = g;
      x.beginPath();
      x.moveTo(cx - u * 0.07, cy + dir * u * rp);
      x.lineTo(cx - w1, y1);
      x.lineTo(cx + w1, y1);
      x.lineTo(cx + u * 0.07, cy + dir * u * rp);
      x.closePath();
      x.fill();
      for (let k = 0; k < 5; k++) {
        const f = ((tt * 0.4 + k / 5) % 1 + 1) % 1, yy = lerp2(cy + dir * u * rp, y1, f);
        x.fillStyle = `rgba(226,232,255,${(1 - f) * 0.6})`;
        x.beginPath();
        x.ellipse(cx, yy, lerp2(u * 0.05, w1 * 0.4, f), 1.2 + f * 2, 0, 0, 7);
        x.fill();
      }
    }
    const eRy = rp + (1 - rp) * 0.12;
    x.save();
    x.beginPath();
    x.ellipse(cx, cy, u, u * eRy, 0, 0, 7);
    x.fillStyle = `rgba(184,146,255,${0.07 + (v.phase >= 4 ? 0.1 : 0)})`;
    x.fill();
    x.setLineDash([3, 4]);
    x.strokeStyle = "rgba(184,146,255,0.75)";
    x.lineWidth = 1;
    x.stroke();
    x.restore();
    for (let i = 0; i < 22; i++) {
      const lat2 = i * 0.618 % 1 * 2 - 1, f = ((tt * (0.25 + a * 0.4) * (1.2 - Math.abs(lat2)) + i * 0.37) % 1 + 1) % 1;
      const rr = lerp2(rp * 1.04, 0.97, i * 0.37 % 1), ex = Math.cos(f * Math.PI * 2) * rr, ey = lat2 * eRy * Math.sqrt(1 - ex * ex / (rr * rr + 1e-6)) * 0.9;
      if (Math.sin(f * Math.PI * 2) < 0 && Math.hypot(ex, ey) < rp * 1.02) continue;
      const [sx, sy] = P(ex, ey);
      x.fillStyle = `rgba(214,196,255,${0.25 + 0.45 * Math.max(0, Math.sin(f * Math.PI * 2))})`;
      x.fillRect(sx - 2.2, sy - 0.6, 4.4, 1.2);
    }
    x.save();
    x.setLineDash([2, 5]);
    x.strokeStyle = "rgba(255,240,220,0.6)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(cx, cy, rph * u, 0, 7);
    x.stroke();
    x.restore();
    const hg = x.createRadialGradient(cx, cy, 0, cx, cy, rp * u);
    hg.addColorStop(0, "#000");
    hg.addColorStop(0.88, "#020208");
    hg.addColorStop(1, "#14102a");
    x.fillStyle = hg;
    x.beginPath();
    x.arc(cx, cy, rp * u, 0, 7);
    x.fill();
    x.strokeStyle = `rgba(255,232,205,${0.55 + v.lum * 0.35})`;
    x.lineWidth = 1.4;
    x.stroke();
    x.save();
    x.setLineDash([6, 4]);
    x.strokeStyle = "rgba(242,165,65,0.9)";
    x.lineWidth = 1.2;
    x.beginPath();
    x.arc(cx, cy, ris * u, 0, 7);
    x.stroke();
    x.restore();
    if (v.stations > 0) {
      x.strokeStyle = "rgba(127,211,234,0.4)";
      x.lineWidth = 1;
      x.beginPath();
      x.arc(cx, cy, rst * u, 0, 7);
      x.stroke();
      const n = Math.min(8, v.stations);
      for (let i = 0; i < n; i++) {
        const ang = i / n * Math.PI * 2 + tt * 0.3 / v.gamma, [sx, sy] = P(Math.cos(ang) * rst, Math.sin(ang) * rst);
        x.fillStyle = "#7fd3ea";
        x.fillRect(sx - 2, sy - 1, 4, 2);
        x.fillRect(sx - 0.5, sy - 3, 1, 6);
      }
    }
    if (v.dive >= 0) {
      const f = 1 - v.dive / HOLE.diveSec, ang = f * 16, rr = lerp2(3, rph * 1.02, Math.pow(f, 0.6));
      const [sx, sy] = P(Math.cos(ang) * rr, Math.sin(ang) * rr * 0.8);
      x.fillStyle = "#f2a541";
      x.beginPath();
      x.arc(sx, sy, 2.4, 0, 7);
      x.fill();
    }
    const rows = [
      [t("ui.hole.horizon"), rp, "255,230,200"],
      [t("ui.hole.photon"), rph, "255,240,220"],
      ["ISCO", ris, "242,178,90"],
      [t("ui.hole.ergo"), 1, "206,180,255"]
    ];
    if (v.stations > 0) rows.push([t("ui.hole.stations"), rst, "127,211,234"]);
    rows.sort((p1, p2) => p1[1] - p2[1]);
    const ry = H - 26;
    x.strokeStyle = "rgba(200,205,235,0.35)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(cx, ry);
    x.lineTo(cx + rmax * u, ry);
    x.stroke();
    x.font = `11px ${MONO}`;
    x.fillStyle = "rgba(176,181,212,0.8)";
    x.textAlign = "center";
    for (let k = 0; k <= Math.floor(rmax); k++) {
      x.fillRect(cx + k * u - 0.5, ry - 3, 1, 6);
      x.fillText(`${Math.round(k * HOLE.rsKm)} km`, cx + k * u, ry + 15);
    }
    x.textAlign = "left";
    rows.forEach(([, r, col]) => {
      x.fillStyle = `rgba(${col},0.95)`;
      x.beginPath();
      x.moveTo(cx + r * u, ry - 1);
      x.lineTo(cx + r * u - 3.5, ry - 8);
      x.lineTo(cx + r * u + 3.5, ry - 8);
      x.closePath();
      x.fill();
    });
    if (!narrow) {
      const lx = W - legW + 10, top = 16;
      x.fillStyle = "rgba(10,12,28,0.6)";
      x.strokeStyle = "rgba(120,128,180,0.25)";
      x.beginPath();
      x.roundRect(lx - 10, top - 6, legW - 6, 26 + rows.length * 30 + (v.stations > 0 ? 50 : 0), 8);
      x.fill();
      x.stroke();
      x.font = `600 11px ${MONO}`;
      x.fillStyle = "rgba(176,181,212,0.85)";
      x.fillText(t("ui.hole.legend").toUpperCase(), lx, top + 8);
      rows.forEach(([name, r, col], i) => {
        const yy = top + 30 + i * 30;
        x.fillStyle = `rgba(${col},0.95)`;
        x.fillRect(lx, yy - 6, 8, 8);
        x.font = `12px ${MONO}`;
        x.fillText(name, lx + 16, yy + 2);
        x.font = `11px ${MONO}`;
        x.fillStyle = "rgba(176,181,212,0.85)";
        const km = `${(r * HOLE.rsKm).toFixed(1).replace(".", ",")} km \xB7 `;
        x.fillText(km, lx + 16, yy + 16);
        rsText(x, r, lx + 16 + x.measureText(km).width, yy + 16);
      });
      if (v.stations > 0) {
        const yy = top + 30 + rows.length * 30 + 4;
        const clock2 = (px, label4, rate2, col) => {
          x.strokeStyle = col;
          x.lineWidth = 1.2;
          x.beginPath();
          x.arc(px, yy + 8, 9, 0, 7);
          x.stroke();
          const ang = -Math.PI / 2 + tt * 1.2 * rate2;
          x.beginPath();
          x.moveTo(px, yy + 8);
          x.lineTo(px + Math.cos(ang) * 7, yy + 8 + Math.sin(ang) * 7);
          x.stroke();
          x.font = `11px ${MONO}`;
          x.fillStyle = col;
          x.fillText(label4, px + 14, yy + 12);
        };
        clock2(lx + 9, "Vesper", 1, "rgba(225,228,244,0.9)");
        clock2(lx + 104, `\u03B3 ${v.gamma >= 10 ? Math.round(v.gamma) : v.gamma.toFixed(1).replace(".", ",")}\xD7`, 1 / v.gamma, "rgba(127,211,234,0.95)");
      }
    }
    x.font = `600 12px ${MONO}`;
    x.fillStyle = "rgba(225,228,244,0.9)";
    x.fillText(title.toUpperCase(), 14, 22);
    x.font = `11px ${MONO}`;
    x.fillStyle = "rgba(176,181,212,0.7)";
    x.fillText(t("ui.hole.profileSub"), 14, 38);
  }
  var MAP_IDS = ["cas", "oort", "lens", "pulsar", "tde", "cloud", "pole", "dwarf", "ergo", "stream"];
  var TILT2 = 0.42;
  var trail2 = [];
  function pos(id, tt) {
    const l = L[id], a = l.angle + tt * l.speed;
    if (id === "pole") return [0, -0.36];
    return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * TILT2];
  }
  function drawHoleMap(c, s, v, time) {
    const p = prep(c);
    if (!p) return;
    const { x, W, H, dpr } = p, tt = reduce2 ? 0 : time;
    x.drawImage(bgFor(W, H, dpr), 0, 0, W, H);
    const cx = W / 2, cy = H / 2, sc = Math.min(W / 2 * 0.9, H / 2 / TILT2 * 0.82);
    const P = (q) => [cx + q[0] * sc, cy + q[1] * sc];
    const nr = sc * 0.95, npx = Math.min(640, Math.round(nr * 2 * dpr));
    x.save();
    x.translate(cx, cy);
    x.scale(1, 0.62);
    x.rotate(tt * 3e-3);
    x.globalAlpha = 0.5;
    x.drawImage(nebula(npx), -nr, -nr, nr * 2, nr * 2);
    x.restore();
    x.globalAlpha = 1;
    for (const id of MAP_IDS) {
      if (id === "pole" || !(L[id].req?.(s) || s.visited[id])) continue;
      const rx = L[id].orbit * sc;
      x.strokeStyle = "rgba(170,180,230,0.22)";
      x.lineWidth = 1;
      x.beginPath();
      x.ellipse(cx, cy, rx, rx * TILT2, 0, 0, 7);
      x.stroke();
    }
    const pal = DISK[v.phase], dr = sc * 0.1;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, dr * 2.4);
    g.addColorStop(0, `rgba(${pal[1].join(",")},${0.25 + v.lum * 0.3})`);
    g.addColorStop(1, `rgba(${pal[2].join(",")},0)`);
    x.fillStyle = g;
    x.beginPath();
    x.arc(cx, cy, dr * 2.4, 0, 7);
    x.fill();
    x.fillStyle = `rgba(${pal[1].join(",")},${0.5 + v.lum * 0.4})`;
    x.beginPath();
    x.ellipse(cx, cy, dr, dr * TILT2 * 0.6, 0, 0, 7);
    x.fill();
    if (v.jets > 0) {
      for (const dir of [-1, 1]) {
        const jg = x.createLinearGradient(cx, cy, cx, cy + dir * sc * 0.4);
        jg.addColorStop(0, `rgba(196,214,255,${0.5 * v.jets + 0.1})`);
        jg.addColorStop(1, "rgba(140,120,255,0)");
        x.fillStyle = jg;
        x.beginPath();
        x.moveTo(cx - 1.5, cy);
        x.lineTo(cx - sc * 0.04, cy + dir * sc * 0.4);
        x.lineTo(cx + sc * 0.04, cy + dir * sc * 0.4);
        x.lineTo(cx + 1.5, cy);
        x.fill();
      }
    }
    x.fillStyle = "#000";
    x.beginPath();
    x.arc(cx, cy, dr * 0.32, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(255,235,210,0.85)";
    x.lineWidth = 1;
    x.stroke();
    x.font = `12px ${MONO}`;
    for (const id of MAP_IDS) {
      if (!(L[id].req?.(s) || s.visited[id])) continue;
      const [px, py] = P(pos(id, tt)), done = !!s.visited[id];
      x.strokeStyle = done ? "rgba(127,214,154,0.9)" : "rgba(242,178,90,0.95)";
      x.lineWidth = 1.4;
      x.beginPath();
      x.moveTo(px, py - 5);
      x.lineTo(px + 5, py);
      x.lineTo(px, py + 5);
      x.lineTo(px - 5, py);
      x.closePath();
      x.stroke();
      if (done) {
        x.fillStyle = "rgba(127,214,154,0.35)";
        x.fill();
      }
      x.fillStyle = done ? "#e1e4f4" : "#b0b5d4";
      x.fillText(t(`loc.${id}.short`), px + 9, py + 4);
      if (!done && s.travel?.to !== id) {
        const ok = canTravel(s, id);
        x.fillStyle = ok ? "rgba(242,165,65,0.95)" : "rgba(138,144,184,0.85)";
        x.fillText(`${energy(L[id].cost).replace(/<\/?sup>/g, "")}${ok ? " \xB7 " + t("ui.map.clickGo") : ""}`, px + 9, py + 19);
      }
    }
    let sp, ang = -Math.PI / 2;
    const home = P([-0.62, -0.22]);
    if (s.travel && MAP_IDS.includes(s.travel.to)) {
      const b = P(pos(s.travel.to, tt)), k = s.travel.t / s.travel.total;
      const ctrl = [(home[0] + b[0]) / 2, Math.min(home[1], b[1]) - sc * 0.15];
      const q = (f) => [(1 - f) ** 2 * home[0] + 2 * (1 - f) * f * ctrl[0] + f * f * b[0], (1 - f) ** 2 * home[1] + 2 * (1 - f) * f * ctrl[1] + f * f * b[1]];
      x.setLineDash([3, 4]);
      x.strokeStyle = "rgba(242,165,65,0.35)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(...home);
      x.quadraticCurveTo(ctrl[0], ctrl[1], b[0], b[1]);
      x.stroke();
      x.setLineDash([]);
      sp = q(k);
      const ah = q(Math.min(1, k + 0.01));
      ang = Math.atan2(ah[1] - sp[1], ah[0] - sp[0]);
      trail2.push(sp);
      if (trail2.length > 40) trail2.shift();
    } else {
      trail2.length = 0;
      sp = home;
    }
    for (let i = 1; i < trail2.length; i++) {
      x.strokeStyle = `rgba(242,165,65,${i / trail2.length * 0.5})`;
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(...trail2[i - 1]);
      x.lineTo(...trail2[i]);
      x.stroke();
    }
    x.save();
    x.translate(sp[0], sp[1]);
    x.rotate(ang);
    x.fillStyle = "#f2a541";
    x.beginPath();
    x.moveTo(6, 0);
    x.lineTo(-4, -3.2);
    x.lineTo(-2.5, 0);
    x.lineTo(-4, 3.2);
    x.closePath();
    x.fill();
    x.restore();
    x.fillStyle = "#b0b5d4";
    x.fillText("VESPER-7", home[0] + 9, home[1] + 16);
    const vg = x.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
    vg.addColorStop(0, "rgba(5,6,15,0)");
    vg.addColorStop(1, "rgba(5,6,15,0.5)");
    x.fillStyle = vg;
    x.fillRect(0, 0, W, H);
  }
  var SCENE_TILT = 0.36;
  function sceneGeom(W, H) {
    const m = Math.min(W, H * 1.15);
    return { cx: W / 2, cy: H * 0.5, R: m * 0.43, Rsh: m * 0.095, tilt: SCENE_TILT };
  }
  var fx = [];
  function drawScene(c, v, sv, time) {
    const p = prep(c);
    if (!p) return;
    const { x, W, H } = p, g = sceneGeom(W, H);
    drawHoleAt(c, v, time, g);
    const { cx, cy, R: R2, Rsh, tilt } = g;
    const P = (r, th) => [cx + Math.cos(th) * r * R2, cy + Math.sin(th) * r * R2 * tilt];
    const hidden = (r, th) => {
      const [px] = P(r, th);
      return Math.sin(th) < 0 && Math.abs(px - cx) < Rsh * 1.05;
    };
    x.save();
    if (sv.pulse < 2.6) {
      const f = sv.pulse / 2.6;
      x.strokeStyle = `rgba(184,146,255,${0.55 * (1 - f)})`;
      x.lineWidth = 1.6;
      x.beginPath();
      x.ellipse(cx, cy, Rsh + f * R2 * 1.1, (Rsh + f * R2 * 1.1) * tilt, 0, 0, 7);
      x.stroke();
    }
    for (const th of sv.inj ?? []) {
      const [ix, iy] = P(0.97, th);
      x.strokeStyle = "rgba(127,211,234,0.95)";
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(ix, iy - 6);
      x.lineTo(ix + 5, iy);
      x.lineTo(ix, iy + 6);
      x.lineTo(ix - 5, iy);
      x.closePath();
      x.stroke();
      x.fillStyle = "rgba(127,211,234,0.35)";
      x.fill();
    }
    if (!sv.locked) {
      x.setLineDash([5, 6]);
      x.strokeStyle = "rgba(242,165,65,0.5)";
      x.lineWidth = 1.2;
      x.beginPath();
      x.ellipse(cx, cy, sv.relR * R2, sv.relR * R2 * tilt, 0, 0, 7);
      x.stroke();
      x.setLineDash([]);
    }
    for (const b of sv.blobs) {
      for (let i = 1; i < b.trail.length; i++) {
        const [ar, at] = b.trail[i - 1], [br, bt] = b.trail[i];
        if (hidden(br, bt)) continue;
        const [ax, ay] = P(ar, at), [bx, by] = P(br, bt), k = i / b.trail.length;
        x.strokeStyle = b.auto ? `rgba(127,211,234,${k * 0.75})` : b.gold ? `rgba(245,205,85,${k * 0.8})` : `rgba(255,176,146,${k * 0.7})`;
        x.lineWidth = b.auto ? 1 + k * 1.5 : 1 + k * 2;
        x.beginPath();
        x.moveTo(ax, ay);
        x.lineTo(bx, by);
        x.stroke();
      }
      if (hidden(b.r, b.th)) continue;
      const [px, py] = P(b.r, b.th), rr = 6 + Math.min(6, b.mult * 2);
      const gg = x.createRadialGradient(px, py, 0, px, py, rr);
      gg.addColorStop(0, b.auto ? "rgba(214,246,255,1)" : b.gold ? "rgba(255,244,196,1)" : "rgba(255,226,210,1)");
      gg.addColorStop(1, b.auto ? "rgba(127,211,234,0)" : b.gold ? "rgba(245,205,85,0)" : "rgba(255,143,122,0)");
      x.fillStyle = gg;
      x.beginPath();
      x.arc(px, py, rr, 0, 7);
      x.fill();
    }
    for (const f of sv.flares) {
      const [px, py] = P(f.r, f.th);
      const near = fx.filter((q) => q.life > 0.5 && Math.abs(q.x - px) < 90 && Math.abs(q.y - py) < 40).length;
      fx.push({ x: px, y: py - near * 15, life: 1, gold: f.gold, s: Math.min(2.4, 0.8 + f.mult * 0.3), text: f.text });
    }
    for (let i = fx.length - 1; i >= 0; i--) {
      const f = fx[i];
      f.life -= 1 / 60;
      if (f.life <= 0) {
        fx.splice(i, 1);
        continue;
      }
      const r = (1 - f.life) * 55 * f.s + 5;
      x.strokeStyle = f.gold ? `rgba(245,205,85,${f.life})` : `rgba(255,240,226,${f.life})`;
      x.lineWidth = 2;
      x.beginPath();
      x.arc(f.x, f.y, r, 0, 7);
      x.stroke();
      const fg = x.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 0.8);
      fg.addColorStop(0, `rgba(255,255,255,${f.life * 0.8})`);
      fg.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = fg;
      x.beginPath();
      x.arc(f.x, f.y, r * 0.8, 0, 7);
      x.fill();
      x.font = `600 12px ${MONO}`;
      x.textAlign = "center";
      x.fillStyle = f.gold ? `rgba(245,205,85,${Math.min(1, f.life * 1.5)})` : `rgba(127,211,234,${Math.min(1, f.life * 1.5)})`;
      if (f.text) x.fillText(f.text, f.x, f.y - 16 - (1 - f.life) * 26);
    }
    x.font = `12px ${MONO}`;
    x.textAlign = "left";
    x.fillStyle = "rgba(176,181,212,0.9)";
    x.fillText(sv.tankText, 14, H - 26);
    if (sv.tankText) {
      x.fillStyle = "rgba(42,48,88,0.9)";
      x.fillRect(14, H - 18, 160, 5);
      x.fillStyle = sv.tank >= 0.999 ? "#f2a541" : "#ff8f7a";
      x.fillRect(14, H - 18, 160 * Math.min(1, sv.tank), 5);
    }
    x.textAlign = "center";
    if (sv.chainText) {
      x.font = `700 22px "Chakra Petch", ${MONO}`;
      x.fillStyle = "#f2a541";
      x.fillText(sv.chainText, cx, 40);
    }
    if (sv.overText) {
      x.font = `600 13px ${MONO}`;
      x.fillStyle = "#f5cd55";
      x.fillText(sv.overText, cx, sv.chainText ? 62 : 40);
    }
    if (sv.locked) {
      x.font = `13px ${MONO}`;
      x.fillStyle = "rgba(176,181,212,0.9)";
      x.fillText(sv.locked, cx, H - 40);
    }
    if (sv.hover !== null && !sv.locked) {
      const [hx, hy] = P(sv.relR, sv.hover);
      x.strokeStyle = "rgba(242,165,65,0.95)";
      x.lineWidth = 1.5;
      x.beginPath();
      x.arc(hx, hy, 7, 0, 7);
      x.stroke();
      x.font = `12px ${MONO}`;
      x.textAlign = hx > cx ? "left" : "right";
      x.fillStyle = "rgba(242,165,65,0.95)";
      x.fillText(sv.hoverText, hx + (hx > cx ? 12 : -12), hy - 10);
    }
    x.textAlign = "left";
    x.restore();
  }
  function drawHoleAt(c, v, time, _g) {
    drawHole(c, v, time, "", true, SCENE_TILT);
  }
  function holeMapHit(W, H, s, mx, my, time) {
    const tt = reduce2 ? 0 : time, cx = W / 2, cy = H / 2, sc = Math.min(W / 2 * 0.9, H / 2 / TILT2 * 0.82);
    let best = null, bd = 22;
    for (const id of MAP_IDS) {
      if (!(L[id].req?.(s) || s.visited[id])) continue;
      const q = pos(id, tt), px = cx + q[0] * sc, py = cy + q[1] * sc, d = Math.hypot(mx - px, my - py);
      if (d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
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

  // src/ui/net.ts
  var reduce3 = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MONO2 = '"JetBrains Mono", ui-monospace, monospace';
  var EXO = "142,240,200";
  var AMBER = "242,165,65";
  var COOL = "111,168,255";
  var PULSE = "184,146,255";
  function prep2(c) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return null;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    const x = c.getContext("2d");
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { x, W, H, dpr };
  }
  function netGeo(W, H) {
    const m = 26, k = Math.min((W - 2 * m) / MAP.w, (H - 2 * m - 18) / MAP.h);
    return { ox: (W - MAP.w * k) / 2, oy: (H - 18 - MAP.h * k) / 2, k, W, H };
  }
  var toPx = (g, n) => [g.ox + n.x * g.k, g.oy + n.y * g.k];
  function nodeR(n) {
    if (n.type === "home") return 9;
    if (n.type === "stream") return 8;
    return Math.max(3, Math.min(13, 2.2 + (Math.log10(Math.max(1, n.L)) - 24) * 0.82));
  }
  function hitNode(g, s, mx, my) {
    let best = null, bd = Infinity;
    for (const n of [HOME, ...NODES]) {
      if (!isRevealed(s, n)) continue;
      const [px, py] = toPx(g, n), d = Math.hypot(mx - px, my - py);
      if (d < Math.max(16, nodeR(n) + 8) && d < bd) {
        bd = d;
        best = n.id;
      }
    }
    return best;
  }
  function hitLink(g, s, mx, my) {
    let best = null, bd = 15;
    for (const id in s.bridge.links) {
      const [ax, ay] = toPx(g, NODE[s.bridge.links[id].p]), [bx, by] = toPx(g, NODE[id]);
      const dx = bx - ax, dy = by - ay, t2 = Math.max(0.12, Math.min(0.88, ((mx - ax) * dx + (my - ay) * dy) / (dx * dx + dy * dy || 1)));
      const d = Math.hypot(mx - (ax + dx * t2), my - (ay + dy * t2));
      if (d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
  }
  var bgCache2 = /* @__PURE__ */ new Map();
  function armBg(W, H, dpr, g) {
    const key = `${W}x${H}@${dpr}`;
    let cv = bgCache2.get(key);
    if (cv) return cv;
    if (bgCache2.size > 4) bgCache2.clear();
    cv = document.createElement("canvas");
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    const x = cv.getContext("2d");
    const lw = Math.max(64, Math.round(W / 4)), lh = Math.max(40, Math.round(H / 4));
    const lo = document.createElement("canvas");
    lo.width = lw;
    lo.height = lh;
    const lx = lo.getContext("2d"), img = lx.createImageData(lw, lh), d = img.data;
    for (let j = 0; j < lh; j++) for (let i = 0; i < lw; i++) {
      const mx = (i / lw * W - g.ox) / g.k, my = (j / lh * H - g.oy) / g.k;
      const ax = mx, ay = 0.78 - mx * 0.42 + 0.08 * Math.sin(mx * 2.2);
      const dy = (my - ay) / 0.5, band = Math.exp(-dy * dy * 1.3);
      const n1 = sfbm(mx * 2.4 + 3, my * 2.4 + 7, 4), n2 = sfbm(mx * 6 + 11, my * 6 - 4, 3);
      const lane = Math.exp(-Math.pow((my - ay + 0.07 + n2 * 0.06) / 0.05, 2)) * band;
      const glow = Math.max(0, band * (0.55 + n1 * 0.7) - lane * 0.9);
      const warm = Math.max(0, n2) * band;
      const o = (j * lw + i) * 4;
      d[o] = 10 + glow * 52 + warm * 30;
      d[o + 1] = 12 + glow * 44 + warm * 12;
      d[o + 2] = 26 + glow * 72 + warm * 6;
      d[o + 3] = 255;
      void ax;
    }
    lx.putImageData(img, 0, 0);
    x.imageSmoothingEnabled = true;
    x.drawImage(lo, 0, 0, cv.width, cv.height);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    let sd = 11;
    const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    for (let i = 0; i < W * H / 260; i++) {
      const px = r() * W, py = r() * H, mx = (px - g.ox) / g.k, my = (py - g.oy) / g.k;
      const ay = 0.78 - mx * 0.42 + 0.08 * Math.sin(mx * 2.2), inBand = Math.exp(-Math.pow((my - ay) / 0.42, 2) * 1.6);
      if (r() > 0.35 + inBand * 0.65) continue;
      const layer2 = r(), a = layer2 < 0.75 ? 0.25 + r() * 0.3 : layer2 < 0.96 ? 0.45 + r() * 0.35 : 0.8;
      const col = r() < 0.2 ? `rgba(255,214,170,${a})` : r() < 0.1 ? `rgba(170,200,255,${a})` : `rgba(220,228,255,${a})`;
      x.fillStyle = col;
      const sz = layer2 < 0.75 ? 0.7 : layer2 < 0.96 ? 1.1 : 1.7;
      x.fillRect(px, py, sz, sz);
    }
    const ly2 = Math.round(1e3 / MAP.ly * g.k);
    x.strokeStyle = "rgba(176,181,212,0.55)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(14, H - 14);
    x.lineTo(14 + ly2, H - 14);
    x.moveTo(14, H - 18);
    x.lineTo(14, H - 10);
    x.moveTo(14 + ly2, H - 18);
    x.lineTo(14 + ly2, H - 10);
    x.stroke();
    x.font = `12px ${MONO2}`;
    x.fillStyle = "rgba(176,181,212,0.75)";
    x.textAlign = "left";
    x.fillText("1 000 ly", 20 + ly2, H - 10);
    bgCache2.set(key, cv);
    return cv;
  }
  var TYPE_COL = {
    home: "232,236,255",
    red: "255,138,106",
    sun: "255,233,184",
    binary: "255,243,214",
    neutron: "230,251,255",
    blue: "188,216,255",
    assoc: "170,205,255",
    cluster: "255,242,220",
    nebula: "255,150,190",
    arm: "214,222,255",
    kilo: "245,205,85",
    stream: "255,226,190"
  };
  function drawNode(x, n, px, py, time, on) {
    const r = nodeR(n), c = TYPE_COL[n.type], seed2 = n.x * 97 + n.y * 61;
    if (n.type === "home") {
      x.fillStyle = "#000";
      x.beginPath();
      x.arc(px, py, r * 0.8, 0, 7);
      x.fill();
      x.strokeStyle = `rgba(${AMBER},0.95)`;
      x.lineWidth = 2;
      x.beginPath();
      x.ellipse(px, py, r * 1.8, r * 0.6, -0.3, 0, 7);
      x.stroke();
      x.strokeStyle = "rgba(255,220,170,0.6)";
      x.lineWidth = 1;
      x.beginPath();
      x.arc(px, py, r * 0.95, 0, 7);
      x.stroke();
      return;
    }
    if (n.type === "stream") {
      let sd = Math.floor(seed2 * 1e3) % 2147483646 + 1;
      const rr = () => (sd = sd * 16807 % 2147483647) / 2147483647, ang = seed2 % 3.14;
      for (let i = 0; i < 34; i++) {
        const t2 = rr() * 2 - 1, off = (rr() - 0.5) * 3.2, bend = t2 * t2 * 5;
        const qx = px + Math.cos(ang) * t2 * r * 3 - Math.sin(ang) * (off + bend), qy = py + Math.sin(ang) * t2 * r * 3 + Math.cos(ang) * (off + bend);
        x.fillStyle = `rgba(${c},${(0.35 + rr() * 0.5) * (1 - Math.abs(t2) * 0.5)})`;
        x.fillRect(qx, qy, 1.3, 1.3);
      }
      const hg = x.createRadialGradient(px, py, 0, px, py, r * 2.2);
      hg.addColorStop(0, `rgba(${c},0.22)`);
      hg.addColorStop(1, `rgba(${c},0)`);
      x.fillStyle = hg;
      x.beginPath();
      x.arc(px, py, r * 2.2, 0, 7);
      x.fill();
      if (on) {
        x.setLineDash([2, 3]);
        x.strokeStyle = `rgba(${EXO},0.7)`;
        x.lineWidth = 1;
        x.beginPath();
        x.ellipse(px, py, r * 2.4, r * 1.1, ang, 0, 7);
        x.stroke();
        x.setLineDash([]);
      }
      return;
    }
    const halo = x.createRadialGradient(px, py, 0, px, py, r * 2.6);
    halo.addColorStop(0, `rgba(${c},0.32)`);
    halo.addColorStop(1, `rgba(${c},0)`);
    x.fillStyle = halo;
    x.beginPath();
    x.arc(px, py, r * 2.6, 0, 7);
    x.fill();
    if (n.type === "cluster" || n.type === "assoc" || n.type === "arm") {
      const k = n.type === "arm" ? 26 : n.type === "cluster" ? 14 : 6;
      let sd = Math.floor(seed2 * 1e3) % 2147483646 + 1;
      const rr = () => (sd = sd * 16807 % 2147483647) / 2147483647;
      for (let i = 0; i < k; i++) {
        const a = rr() * 6.283, d = Math.pow(rr(), n.type === "cluster" ? 1.6 : 0.8) * r * 1.25;
        x.fillStyle = `rgba(${i % 4 === 0 && n.type !== "cluster" ? "188,216,255" : c},${0.55 + rr() * 0.45})`;
        const sz = n.type === "arm" ? 1.3 : 1.5;
        x.fillRect(px + Math.cos(a) * d - sz / 2, py + Math.sin(a) * d - sz / 2, sz, sz);
      }
    } else if (n.type === "nebula") {
      for (let i = 0; i < 3; i++) {
        const a = seed2 + i * 2.1, g = x.createRadialGradient(px + Math.cos(a) * r * 0.5, py + Math.sin(a) * r * 0.5, 0, px, py, r * 1.6);
        g.addColorStop(0, i === 1 ? "rgba(127,211,234,0.35)" : `rgba(${c},0.38)`);
        g.addColorStop(1, `rgba(${c},0)`);
        x.fillStyle = g;
        x.beginPath();
        x.arc(px, py, r * 1.6, 0, 7);
        x.fill();
      }
      x.fillStyle = "rgba(255,255,255,0.9)";
      x.fillRect(px - 1, py - 1, 2, 2);
    } else if (n.type === "binary") {
      const a = time * 0.6 + seed2;
      for (const [k, rad] of [[0, r * 0.7], [Math.PI, r * 0.5]]) {
        x.fillStyle = k ? "rgba(255,217,160,1)" : `rgba(${c},1)`;
        x.beginPath();
        x.arc(px + Math.cos(a + k) * r * 0.55, py + Math.sin(a + k) * r * 0.55, rad, 0, 7);
        x.fill();
      }
    } else if (n.type === "kilo") {
      x.strokeStyle = `rgba(${c},0.8)`;
      x.lineWidth = 1.2;
      x.beginPath();
      x.arc(px, py, r * 1.2, 0, 7);
      x.stroke();
      x.strokeStyle = `rgba(${EXO},0.6)`;
      x.beginPath();
      x.arc(px, py, r * 1.8 + Math.sin(time + seed2) * 1.5, 0, 7);
      x.stroke();
      x.fillStyle = "rgba(255,248,220,1)";
      x.beginPath();
      x.arc(px, py, r * 0.45, 0, 7);
      x.fill();
    } else {
      x.fillStyle = `rgba(${c},1)`;
      x.beginPath();
      x.arc(px, py, n.type === "neutron" ? r * 0.55 : r * 0.75, 0, 7);
      x.fill();
      if (n.type === "neutron") {
        const a = (reduce3 ? 0.8 : time * 2.6) + seed2, len = r * 3.2;
        x.fillStyle = `rgba(${c},0.45)`;
        for (const k of [0, Math.PI]) {
          x.beginPath();
          x.moveTo(px, py);
          x.lineTo(px + Math.cos(a + k - 0.12) * len, py + Math.sin(a + k - 0.12) * len);
          x.lineTo(px + Math.cos(a + k + 0.12) * len, py + Math.sin(a + k + 0.12) * len);
          x.closePath();
          x.fill();
        }
      }
    }
    if (on) {
      x.setLineDash([2, 3]);
      x.strokeStyle = `rgba(${EXO},0.7)`;
      x.lineWidth = 1;
      x.beginPath();
      x.ellipse(px, py, r * 1.9 + 3, (r * 1.9 + 3) * 0.55, (reduce3 ? 0 : time * 0.15) + seed2, 0, 7);
      x.stroke();
      x.setLineDash([]);
    }
  }
  function drawNet(c, s, ui, time, names) {
    const p = prep2(c);
    if (!p) return;
    const { x, W, H, dpr } = p, g = netGeo(W, H), tt = reduce3 ? 0 : time;
    x.drawImage(armBg(W, H, dpr, g), 0, 0, W, H);
    const links = s.bridge.links, ph = wavePhase(s);
    const [hx, hy] = toPx(g, HOME);
    for (const off of s.bridge.lv.dbl ? [0, NET.pulse / 2] : [0]) {
      const q = (ph - off + NET.pulse) % NET.pulse, rad = q * NET.wave * g.k;
      if (rad > 0 && rad < Math.hypot(W, H)) {
        const a = Math.max(0, 0.5 * (1 - q / 4));
        x.strokeStyle = `rgba(${PULSE},${a})`;
        x.lineWidth = 1.6;
        x.beginPath();
        x.arc(hx, hy, rad, 0, 7);
        x.stroke();
        x.strokeStyle = `rgba(${PULSE},${a * 0.35})`;
        x.lineWidth = 6;
        x.beginPath();
        x.arc(hx, hy, rad, 0, 7);
        x.stroke();
      }
    }
    for (const id in links) {
      const l = links[id], [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[id]);
      const sup = ui.flow.supply[id] ?? 0, cap = capOf(s, l), fl = ui.flow.flow[id] ?? 0, full = sup > cap * 0.999;
      const lock = l.lk > 0, wide = 1.4 + Math.min(4.6, l.lv * 0.28), win = inWave(s, id);
      const col = lock ? l.la ? "226,240,255" : "244,246,255" : full ? AMBER : COOL;
      const age = Math.min(1, (s.time - (l.t ?? 0)) / 1.2);
      const ex = ax + (bx - ax) * age, ey = ay + (by - ay) * age;
      if (full && !lock) {
        x.strokeStyle = `rgba(${AMBER},0.2)`;
        x.lineWidth = wide + 7;
        x.beginPath();
        x.moveTo(ax, ay);
        x.lineTo(ex, ey);
        x.stroke();
      }
      if (lock) {
        x.strokeStyle = `rgba(255,255,255,${l.la ? 0.08 : 0.14})`;
        x.lineWidth = wide + 9;
        x.beginPath();
        x.moveTo(ax, ay);
        x.lineTo(ex, ey);
        x.stroke();
      }
      if (win) {
        x.strokeStyle = `rgba(${PULSE},0.55)`;
        x.lineWidth = wide + 6;
        x.beginPath();
        x.moveTo(ax, ay);
        x.lineTo(ex, ey);
        x.stroke();
      }
      if (ui.router === id) {
        x.strokeStyle = `rgba(${EXO},${0.35 + 0.25 * Math.sin(tt * 4)})`;
        x.lineWidth = wide + 4;
        x.beginPath();
        x.moveTo(ax, ay);
        x.lineTo(ex, ey);
        x.stroke();
      }
      x.strokeStyle = `rgba(${col},${id === ui.sel || id === ui.hoverLink ? 1 : 0.85})`;
      x.lineWidth = wide;
      x.beginPath();
      x.moveTo(ax, ay);
      x.lineTo(ex, ey);
      x.stroke();
      if (fl > 0 && age >= 1) {
        const sp = 10 + Math.max(0, Math.log10(fl) - 30) * 6;
        x.setLineDash([2 + Math.min(4, wide * 0.6), 9]);
        x.lineDashOffset = -tt * sp * (lock ? 1.8 : 1);
        x.strokeStyle = lock ? "rgba(255,255,255,0.95)" : full ? "rgba(255,241,214,0.95)" : "rgba(207,226,255,0.85)";
        x.lineWidth = Math.max(1, wide * 0.55);
        x.beginPath();
        x.moveTo(bx, by);
        x.lineTo(ax, ay);
        x.stroke();
        x.setLineDash([]);
        x.lineDashOffset = 0;
      }
      for (const [qx, qy] of [[ax, ay], [bx, by]]) {
        x.strokeStyle = `rgba(${col},0.7)`;
        x.lineWidth = 1;
        x.beginPath();
        x.arc(qx + (bx - ax) * (qx === ax ? 0.06 : -0.06), qy + (by - ay) * (qx === ax ? 0.06 : -0.06), 2.2 + wide * 0.3, 0, 7);
        x.stroke();
      }
      if (full) {
        const k = Math.min(1, Math.log10(sup / cap + 1) * 2), gg = x.createRadialGradient(bx, by, 0, bx, by, 18 + k * 14);
        gg.addColorStop(0, `rgba(${AMBER},${0.35 * k + 0.1 * Math.sin(tt * 3)})`);
        gg.addColorStop(1, `rgba(${AMBER},0)`);
        x.fillStyle = gg;
        x.beginPath();
        x.arc(bx, by, 32, 0, 7);
        x.fill();
      }
    }
    x.font = `600 12px ${MONO2}`;
    x.textAlign = "center";
    for (const id in links) {
      const l = links[id], [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[id]), mx = (ax + bx) / 2, my = (ay + by) / 2;
      if (l.lk > 0) {
        const k = 5;
        x.fillStyle = l.la ? "rgba(180,215,255,0.95)" : "rgba(255,255,255,0.98)";
        x.strokeStyle = "rgba(10,12,24,0.9)";
        x.lineWidth = 2;
        x.beginPath();
        x.moveTo(mx, my - k);
        x.lineTo(mx + k, my);
        x.lineTo(mx, my + k);
        x.lineTo(mx - k, my);
        x.closePath();
        x.stroke();
        x.fill();
        if (id === ui.sel || id === ui.hoverLink) {
          x.fillStyle = "rgba(255,255,255,0.95)";
          x.fillText(`\xD7${l.la ? s.r.quiet ? "1,45" : "1,3" : "1,5"} \xB7 ${Math.ceil(l.lk)} s`, mx, my - 10);
        }
      } else if (id === ui.sel || id === ui.hoverLink) {
        const sup = ui.flow.supply[id] ?? 0, cap = capOf(s, l), r = sup / cap;
        x.fillStyle = r > 1.001 ? `rgb(${AMBER})` : "rgba(207,226,255,0.95)";
        x.fillText(r > 1.001 ? `pln\xFD \xB7 chce ${r >= 10 ? Math.round(r) : r.toFixed(1).replace(".", ",")}\xD7` : `${Math.round(r * 100)} %`, mx, my - 10);
      }
    }
    x.textAlign = "left";
    if (ui.raider && ui.raiderFrom && NODE[ui.raider] && NODE[ui.raiderFrom]) {
      const [ax, ay] = toPx(g, NODE[ui.raiderFrom]), [bx, by] = toPx(g, NODE[ui.raider]);
      x.setLineDash([6, 6]);
      x.lineDashOffset = -tt * 8;
      x.strokeStyle = `rgba(${EXO},0.5)`;
      x.lineWidth = 1.4;
      x.beginPath();
      x.moveTo(ax, ay);
      x.lineTo(ax + (bx - ax) * Math.max(0.08, ui.raiderP), ay + (by - ay) * Math.max(0.08, ui.raiderP));
      x.stroke();
      x.setLineDash([]);
      x.lineDashOffset = 0;
    }
    for (const n of [...NODES, HOME]) {
      if (!isRevealed(s, n)) continue;
      const [px, py] = toPx(g, n), on = isConnected(s, n.id);
      drawNode(x, n, px, py, tt, on && n.type !== "home");
    }
    const dr = ui.drag;
    if (dr) {
      const [ax, ay] = toPx(g, NODE[dr.from]);
      const tx = dr.to ? toPx(g, NODE[dr.to])[0] : dr.mx, ty = dr.to ? toPx(g, NODE[dr.to])[1] : dr.my;
      x.strokeStyle = `rgba(${EXO},0.18)`;
      x.setLineDash([2, 6]);
      x.lineWidth = 1;
      x.beginPath();
      x.arc(ax, ay, NET.reach * g.k, 0, 7);
      x.stroke();
      x.setLineDash([6, 5]);
      x.strokeStyle = dr.to ? dr.ok ? `rgba(${EXO},0.95)` : "rgba(224,101,106,0.9)" : "rgba(176,181,212,0.6)";
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(ax, ay);
      x.lineTo(tx, ty);
      x.stroke();
      x.setLineDash([]);
      if (dr.cost) label2(x, dr.cost, tx + 12, ty - 12, dr.ok ? `rgb(${EXO})` : "#e0656a", W);
    }
    for (let i = ui.flashes.length - 1; i >= 0; i--) {
      const f = ui.flashes[i], age = time - f.t, l = links[f.id];
      if (age > 0.9 || !l) {
        ui.flashes.splice(i, 1);
        continue;
      }
      const [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[f.id]), mx = (ax + bx) / 2, my = (ay + by) / 2;
      x.strokeStyle = f.ok ? `rgba(255,255,255,${1 - age / 0.9})` : `rgba(176,181,212,${0.6 * (1 - age / 0.9)})`;
      x.lineWidth = 2;
      x.beginPath();
      x.arc(mx, my, 6 + age * 40, 0, 7);
      x.stroke();
    }
    for (let i = ui.burst.length - 1; i >= 0; i--) {
      const f = ui.burst[i], age = time - f.t, l = links[f.id];
      if (age > 1.4 || !l) {
        ui.burst.splice(i, 1);
        continue;
      }
      const [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[f.id]), k = age / 1.4;
      const qx = bx + (ax - bx) * k, qy = by + (ay - by) * k, gg = x.createRadialGradient(qx, qy, 0, qx, qy, 16);
      gg.addColorStop(0, `rgba(255,246,220,${1 - k})`);
      gg.addColorStop(1, "rgba(255,246,220,0)");
      x.fillStyle = gg;
      x.beginPath();
      x.arc(qx, qy, 16, 0, 7);
      x.fill();
    }
    x.font = `12px ${MONO2}`;
    const boxes = [];
    const hot = (n) => n.id === ui.hover || n.id === ui.drag?.to || n.id === ui.drag?.from || n.id === ui.sel || n.id === ui.raider;
    const lit = [...NODES].filter((n) => isRevealed(s, n) && isConnected(s, n.id)).sort((a, b) => b.L - a.L).slice(0, 8);
    const order = [HOME, ...NODES.filter((n) => isRevealed(s, n) && hot(n)), ...lit];
    for (const n of order) {
      const [px, py] = toPx(g, n), r = nodeR(n), txt = names(n), w = x.measureText(txt).width;
      const right = px > W - 140, lx = right ? px - r - 6 - w : px + r + 6, ly2 = py - r - 3;
      const box = [lx - 2, ly2 - 12, w + 4, 16];
      if (!hot(n) && n.type !== "home" && boxes.some((q) => q[0] < box[0] + box[2] && box[0] < q[0] + q[2] && q[1] < box[1] + box[3] && box[1] < q[1] + q[3])) continue;
      boxes.push(box);
      x.fillStyle = "rgba(8,10,22,0.55)";
      x.fillRect(box[0], box[1], box[2], box[3]);
      x.fillStyle = hot(n) ? "rgba(232,236,255,1)" : n.type === "home" ? `rgba(${AMBER},0.95)` : "rgba(176,181,212,0.85)";
      x.textAlign = "left";
      x.fillText(txt, lx, ly2);
    }
    for (let i = ui.tips.length - 1; i >= 0; i--) {
      const q = ui.tips[i], age = time - q.t;
      if (age > 1.6 || i < ui.tips.length - 2) {
        ui.tips.splice(i, 1);
        continue;
      }
      x.globalAlpha = Math.min(1, (1.6 - age) * 2);
      label2(x, q.text, q.x + 10, q.y - age * 14, q.ok ? "#ffffff" : `rgb(${PULSE})`, W);
      x.globalAlpha = 1;
    }
    x.textAlign = "left";
    x.font = `12px ${MONO2}`;
    x.fillStyle = `rgba(${PULSE},0.9)`;
    x.fillText(ui.pulseText, 14, H - 30);
  }
  function label2(x, t2, px, py, col, W) {
    x.font = `600 12px ${MONO2}`;
    const w = x.measureText(t2).width + 12, lx = Math.min(W - w - 6, px);
    x.fillStyle = "rgba(10,12,24,0.85)";
    x.fillRect(lx, py - 14, w, 20);
    x.fillStyle = col;
    x.textAlign = "left";
    x.fillText(t2, lx + 6, py);
  }
  function waveIn(s, id) {
    const l = s.bridge.links[id];
    if (!l) return 0;
    const th = hitTime(id, l), ph = wavePhase(s);
    let d = th - ph;
    if (d < -syncWin(s) / 2) d += NET.pulse;
    return Math.max(0, d);
  }
  var skyCache = /* @__PURE__ */ new Map();
  var hash2 = (i, j, k) => {
    const v = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453;
    return v - Math.floor(v);
  };
  function skyAt(X, Y, col, seed2) {
    const band = Math.exp(-Math.pow(Y * 0.9 - X * 0.35 + 0.15, 2) * 3.2) * (0.55 + 0.45 * sfbm(X * 1.6 + seed2, Y * 1.6, 3));
    const neb2 = Math.max(0, sfbm(X * 1.1 + seed2 * 3, Y * 1.1 - seed2, 3) + 0.1);
    let r = 5 + band * 34 + neb2 * col[0] * 0.28, g = 6 + band * 32 + neb2 * col[1] * 0.22, b = 13 + band * 44 + neb2 * col[2] * 0.3;
    const ci = Math.floor(X * 26), cj = Math.floor(Y * 26), h = hash2(ci, cj, seed2);
    if (h > 0.93) {
      const ox = ci + 0.5 - X * 26, oy = cj + 0.5 - Y * 26, d = ox * ox + oy * oy, w = Math.exp(-d * 9) * (h - 0.93) * 14 * 255;
      const warm = hash2(cj, ci, 3) > 0.7;
      r += w * (warm ? 1 : 0.85);
      g += w * (warm ? 0.85 : 0.9);
      b += w * (warm ? 0.65 : 1);
    }
    const rr = Math.hypot(X, Y), core = Math.exp(-Math.pow(rr / 0.05, 2)) * 255, glow = Math.exp(-rr / 0.22);
    return [r + core + glow * col[0] * 0.7, g + core + glow * col[1] * 0.7, b + core + glow * col[2] * 0.7];
  }
  function lensTex(n, px) {
    const key = n.id + px;
    let cv = skyCache.get(key);
    if (cv) return cv;
    if (skyCache.size > 12) skyCache.clear();
    cv = document.createElement("canvas");
    cv.width = cv.height = px;
    const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
    const col = TYPE_COL[n.type === "home" ? "sun" : n.type].split(",").map(Number), seed2 = (n.x * 13 + n.y * 7) % 10;
    for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
      const u = (i - c) / c, v = (j - c) / c, rho = Math.hypot(u, v);
      if (rho > 1) continue;
      const k = Math.tan(Math.min(1.5, rho * Math.PI / 2)) * 0.3 / Math.max(1e-4, rho);
      const [r, g, b] = skyAt(u * k, v * k, col, seed2);
      const ring = Math.exp(-Math.pow((rho - 0.93) / 0.035, 2)) * 70, edge = Math.pow(rho, 6) * 30;
      const o = (j * px + i) * 4;
      d[o] = Math.min(255, r + ring + edge);
      d[o + 1] = Math.min(255, g + ring + edge);
      d[o + 2] = Math.min(255, b + ring * 1.1 + edge * 1.2);
      d[o + 3] = Math.min(255, (1 - rho) * c * 3 * 255);
    }
    x.putImageData(img, 0, 0);
    skyCache.set(key, cv);
    return cv;
  }
  function drawMouth(c, n, time, title, sub, sub2 = "") {
    const p = prep2(c);
    if (!p) return;
    const { x, W, H } = p, cx = W / 2, cy = H / 2 - 18, R2 = Math.min(W, H) * 0.34, tt = reduce3 ? 0 : time;
    x.clearRect(0, 0, W, H);
    const halo = x.createRadialGradient(cx, cy, R2 * 0.95, cx, cy, R2 * 1.5);
    halo.addColorStop(0, "rgba(160,175,255,0.22)");
    halo.addColorStop(1, "rgba(160,175,255,0)");
    x.fillStyle = halo;
    x.beginPath();
    x.arc(cx, cy, R2 * 1.5, 0, 7);
    x.fill();
    x.save();
    x.translate(cx, cy);
    x.rotate(tt * 0.03);
    x.drawImage(lensTex(n, 300), -R2, -R2, R2 * 2, R2 * 2);
    x.restore();
    const a0 = tt * 0.4;
    x.strokeStyle = "rgba(232,236,255,0.35)";
    x.lineWidth = 1.2;
    x.beginPath();
    x.arc(cx, cy, R2 * 1.01, a0, a0 + 1.1);
    x.stroke();
    x.beginPath();
    x.arc(cx, cy, R2 * 1.01, a0 + Math.PI, a0 + Math.PI + 0.7);
    x.stroke();
    const hl = x.createRadialGradient(cx - R2 * 0.42, cy - R2 * 0.48, 0, cx - R2 * 0.42, cy - R2 * 0.48, R2 * 0.45);
    hl.addColorStop(0, "rgba(255,255,255,0.14)");
    hl.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = hl;
    x.beginPath();
    x.arc(cx, cy, R2, 0, 7);
    x.fill();
    x.textAlign = "center";
    x.font = `600 14px "Chakra Petch", ${MONO2}`;
    x.fillStyle = "rgba(232,236,255,0.95)";
    x.fillText(title, cx, cy + R2 + 26);
    x.font = `12px ${MONO2}`;
    x.fillStyle = "rgba(176,181,212,0.85)";
    x.fillText(sub, cx, cy + R2 + 44);
    if (sub2) {
      x.fillStyle = "rgba(142,240,200,0.8)";
      x.fillText(sub2, cx, cy + R2 + 60);
    }
    x.textAlign = "left";
  }
  function drawThroat(c, v, time) {
    const p = prep2(c);
    if (!p) return;
    const { x, W, H } = p, cx = W / 2, top = 46, bot = H - 40, mid = (top + bot) / 2, tt = reduce3 ? 0 : time;
    x.fillStyle = "#070913";
    x.fillRect(0, 0, W, H);
    const span = (bot - top) / 2, wMax = Math.min(W * 0.42, 300), r0 = 14 + Math.min(40, v.lv * 2.6);
    const rad = (t2) => r0 + (wMax - r0) * Math.pow(Math.abs(t2), 2.2);
    const ca = TYPE_COL[v.a.type === "home" ? "home" : v.a.type], cb = TYPE_COL[v.b.type];
    for (let i = 0; i <= 12; i++) {
      const t2 = -1 + i / 6, y = mid + t2 * span, r = rad(t2);
      x.strokeStyle = `rgba(${t2 < 0 ? ca : cb},${0.18 + 0.4 * (1 - Math.abs(t2))})`;
      x.lineWidth = i === 6 ? 2.2 : 1;
      if (i === 6) x.strokeStyle = v.lock ? "rgba(255,255,255,1)" : v.fill >= 0.999 ? `rgba(${AMBER},1)` : "rgba(232,236,255,0.9)";
      x.beginPath();
      x.ellipse(cx, y, r, r * 0.16, 0, 0, 7);
      x.stroke();
    }
    for (const sgn of [-1, 1]) {
      x.strokeStyle = "rgba(232,236,255,0.55)";
      x.lineWidth = 1.4;
      x.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t2 = -1 + i / 30, y = mid + t2 * span, px = cx + sgn * rad(t2);
        i ? x.lineTo(px, y) : x.moveTo(px, y);
      }
      x.stroke();
    }
    const gl = x.createRadialGradient(cx, mid, 0, cx, mid, r0 * 2.4);
    gl.addColorStop(0, v.lock ? "rgba(255,255,255,0.3)" : v.fill >= 0.999 ? `rgba(${AMBER},0.35)` : "rgba(207,226,255,0.18)");
    gl.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = gl;
    x.beginPath();
    x.ellipse(cx, mid, r0 * 2.4, r0 * 0.8, 0, 0, 7);
    x.fill();
    x.setLineDash([4, 8]);
    x.lineDashOffset = -tt * (v.lock ? 40 : 22);
    x.strokeStyle = "rgba(255,241,214,0.9)";
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(cx, top + 20);
    x.lineTo(cx, bot - 20);
    x.stroke();
    x.setLineDash([]);
    x.lineDashOffset = 0;
    x.strokeStyle = `rgb(${EXO})`;
    x.lineWidth = 1.2;
    x.beginPath();
    x.moveTo(cx - r0, mid - 14);
    x.lineTo(cx + r0, mid - 14);
    x.moveTo(cx - r0, mid - 19);
    x.lineTo(cx - r0, mid - 9);
    x.moveTo(cx + r0, mid - 19);
    x.lineTo(cx + r0, mid - 9);
    x.stroke();
    x.font = `600 15px "Chakra Petch", ${MONO2}`;
    x.fillStyle = "rgba(232,236,255,0.95)";
    x.textAlign = "left";
    x.fillText(v.title, 16, 26);
    x.font = `13px ${MONO2}`;
    x.fillStyle = `rgba(${cb},0.95)`;
    x.fillText(v.bName, 16, top + 6);
    x.fillStyle = `rgba(${ca},0.95)`;
    x.fillText(v.aName, 16, bot + 18);
    x.fillStyle = "rgba(176,181,212,0.95)";
    v.lines.forEach((ln, i) => x.fillText(ln, Math.min(W - 230, cx + r0 + 26), mid - 2 + i * 18));
  }
  var GAL_IDS = ["flyby", "magnetar", "globular", "kilonova", "frb", "rotation", "bubbles"];
  var GB = 0.3;
  var GR0 = 0.11;
  var ARMS = [
    { ph: 0, w: 1, key: "perseus" },
    { ph: Math.PI, w: 1, key: "scutum" },
    { ph: Math.PI / 2, w: 0.45, key: "sagittarius" },
    { ph: Math.PI * 1.5, w: 0.45, key: "norma" }
  ];
  var armTh = (ph, r) => ph + Math.log(r / GR0) / GB;
  var wrapA = (a) => {
    a = (a + Math.PI) % (Math.PI * 2);
    return a < 0 ? a + Math.PI : a - Math.PI;
  };
  var GAL_HOME = { r: 0.66, a: armTh(0, 0.66) };
  var GAL_SUN = { r: 0.56, a: armTh(0, 0.66) - 0.12 };
  var GAL_POS = {
    flyby: { r: 0.7, a: GAL_HOME.a + 0.1 },
    magnetar: { r: 0.6, a: GAL_HOME.a - 0.55 },
    globular: { r: 0.93, a: GAL_HOME.a + 0.9 },
    kilonova: { r: 0.46, a: GAL_HOME.a + 0.7 },
    frb: { r: 1, a: GAL_HOME.a + 2.6 },
    rotation: { r: 0.98, a: GAL_HOME.a - 1.6 },
    bubbles: { r: 0.03, a: 1.57 }
  };
  var galBg = null;
  var galKey = "";
  function galGeo(W, H) {
    const tilt = 0.6, R2 = Math.min(W * 0.45, (H - 30) * 0.47 / tilt);
    return { cx: W / 2, cy: H / 2 + 6, R: R2, tilt };
  }
  var galXY = (g, r, a) => [g.cx + Math.cos(a) * r * g.R, g.cy + Math.sin(a) * r * g.R * g.tilt];
  function galPos(id, g) {
    const q = GAL_POS[id] ?? { r: L[id].orbit, a: L[id].angle };
    return galXY(g, q.r, q.a);
  }
  function galPix(u, v) {
    const r = Math.hypot(u, v), th = Math.atan2(v, u);
    if (r > 1.25) return [0, 0, 0];
    const ba = 0.45, bxu = u * Math.cos(ba) + v * Math.sin(ba), bxv = -u * Math.sin(ba) + v * Math.cos(ba);
    const bar = Math.exp(-(Math.pow(bxu / 0.26, 2) + Math.pow(bxv / 0.075, 2)));
    const bulge = Math.exp(-Math.pow(r / 0.1, 2)) + 0.35 * Math.exp(-r / 0.16);
    const disk = Math.exp(-r / 0.3) * 0.7 * Math.max(0, 1 - r / 1.2);
    const clump = 0.25 + 1.5 * Math.max(0, sfbm(u * 11 + 3, v * 11 - 5, 4) + 0.35) * (0.7 + 0.6 * Math.max(0, sfbm(u * 30, v * 30, 2) + 0.4));
    const rag = 0.35 * sfbm(u * 4.5 - 7, v * 4.5 + 2, 3);
    let arm = 0, dust = 0;
    if (r > 0.1) for (const A of ARMS) {
      const d = wrapA(th - armTh(A.ph, r) + rag), fade2 = Math.min(1, (r - 0.1) / 0.18) * Math.max(0, Math.min(1, (1.15 - r) / 0.3));
      arm += A.w * Math.exp(-Math.pow(d * r / (0.06 + 0.05 * r), 2)) * fade2;
      dust += A.w * Math.exp(-Math.pow((d + 0.3 / (r + 0.3)) * r / 0.025, 2)) * fade2 * (0.5 + 0.5 * clump);
    }
    arm *= clump;
    const dk = Math.max(0.3, 1 - dust * 0.55);
    const R2 = (disk * 110 + arm * 120 + bar * 220 + bulge * 255) * dk;
    const G = (disk * 112 + arm * 140 + bar * 190 + bulge * 225) * dk;
    const B2 = (disk * 160 + arm * 220 + bar * 140 + bulge * 165) * dk;
    return [R2, G, B2];
  }
  function drawGalaxy(c, s, time, names, open) {
    const p = prep2(c);
    if (!p) return;
    const { x, W, H, dpr } = p, g = galGeo(W, H), tt = reduce3 ? 0 : time;
    const key = `${W}x${H}@${dpr}`;
    if (galKey !== key || !galBg) {
      galKey = key;
      galBg = document.createElement("canvas");
      galBg.width = Math.round(W * dpr);
      galBg.height = Math.round(H * dpr);
      const bx = galBg.getContext("2d");
      const lw = Math.round(W / 2), lh = Math.round(H / 2), lo = document.createElement("canvas");
      lo.width = lw;
      lo.height = lh;
      const lx = lo.getContext("2d"), img = lx.createImageData(lw, lh), d = img.data;
      for (let j = 0; j < lh; j++) for (let i = 0; i < lw; i++) {
        const u = (i * 2 - g.cx) / g.R, v = (j * 2 - g.cy) / (g.R * g.tilt), [r2, gg, b] = galPix(u, v), o = (j * lw + i) * 4;
        d[o] = 5 + Math.min(250, r2);
        d[o + 1] = 6 + Math.min(249, gg);
        d[o + 2] = 15 + Math.min(240, b);
        d[o + 3] = 255;
      }
      lx.putImageData(img, 0, 0);
      bx.imageSmoothingEnabled = true;
      bx.drawImage(lo, 0, 0, galBg.width, galBg.height);
      bx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let sd = 5;
      const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
      for (let i = 0; i < W * H / 300; i++) {
        bx.fillStyle = `rgba(220,228,255,${r() * 0.35})`;
        bx.fillRect(r() * W, r() * H, 1, 1);
      }
      for (let i = 0; i < 2600; i++) {
        const A = ARMS[i % 4], rr = 0.12 + Math.pow(r(), 0.8) * 0.98, a = armTh(A.ph, rr) + (r() - 0.5) * 0.12 / rr, [px, py] = galXY(g, rr, a);
        const k = r();
        if (k < 0.05 * A.w) {
          const pg = bx.createRadialGradient(px, py, 0, px, py, 3.5);
          pg.addColorStop(0, "rgba(255,140,190,0.6)");
          pg.addColorStop(1, "rgba(255,140,190,0)");
          bx.fillStyle = pg;
          bx.beginPath();
          bx.arc(px, py, 3.5, 0, 7);
          bx.fill();
        } else if (k < 0.6) {
          bx.fillStyle = `rgba(200,220,255,${0.3 + r() * 0.6})`;
          bx.fillRect(px, py, r() < 0.08 ? 1.6 : 1, r() < 0.08 ? 1.6 : 1);
        }
      }
      for (let i = 0; i < 26; i++) {
        const a = r() * 6.283, rr = 0.3 + r() * 0.9, px = g.cx + Math.cos(a) * rr * g.R, py = g.cy + Math.sin(a) * rr * g.R * 0.95;
        bx.fillStyle = "rgba(255,232,200,0.55)";
        bx.beginPath();
        bx.arc(px, py, 1.3, 0, 7);
        bx.fill();
      }
      bx.font = `italic 12px ${MONO2}`;
      bx.textAlign = "center";
      for (const A of ARMS) {
        const rr = A.w > 0.8 ? 0.92 : 0.8, [px, py] = galXY(g, rr, armTh(A.ph, rr) + 0.1);
        bx.fillStyle = "rgba(176,190,240,0.55)";
        bx.fillText(names("arm." + A.key), px, py);
      }
      bx.fillStyle = "rgba(255,226,180,0.7)";
      bx.fillText(names("center"), g.cx, g.cy + g.R * g.tilt * 0.22 + 14);
    }
    x.drawImage(galBg, 0, 0, W, H);
    const [sx, sy] = galXY(g, GAL_SUN.r, GAL_SUN.a);
    x.fillStyle = "rgba(255,233,184,0.95)";
    x.beginPath();
    x.arc(sx, sy, 2.4, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(255,233,184,0.5)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(sx, sy, 6, 0, 7);
    x.stroke();
    x.font = `12px ${MONO2}`;
    x.textAlign = "right";
    x.fillStyle = "rgba(255,233,184,0.85)";
    x.fillText(names("sun"), sx - 10, sy + 4);
    const [hx, hy] = galXY(g, GAL_HOME.r, GAL_HOME.a), bw = Math.max(34, 0.13 * g.R), bh = Math.max(22, 0.08 * g.R);
    x.strokeStyle = `rgba(${EXO},0.85)`;
    x.lineWidth = 1.2;
    x.strokeRect(hx - bw * 0.2, hy - bh * 0.6, bw, bh);
    x.fillStyle = `rgb(${AMBER})`;
    x.beginPath();
    x.arc(hx, hy, 2.6, 0, 7);
    x.fill();
    const pl = tt * 0.5 % 1;
    x.strokeStyle = `rgba(${PULSE},${0.7 * (1 - pl)})`;
    x.beginPath();
    x.arc(hx, hy, 4 + pl * 18, 0, 7);
    x.stroke();
    const hn = names("home"), hw = x.measureText(hn).width, hlx = Math.min(W - hw - 8, hx - bw * 0.2);
    x.textAlign = "left";
    x.fillStyle = "rgba(8,10,22,0.6)";
    x.fillRect(hlx - 3, hy - bh * 0.6 - 19, hw + 6, 17);
    x.fillStyle = `rgba(${EXO},0.95)`;
    x.fillText(hn, hlx, hy - bh * 0.6 - 6);
    for (const id of GAL_IDS) {
      if (!open(id)) continue;
      const [px, py] = galPos(id, g), done = !!s.visited[id], fly = s.travel?.to === id;
      x.strokeStyle = done ? `rgba(${EXO},0.9)` : `rgba(${AMBER},0.95)`;
      x.lineWidth = 1.5;
      x.beginPath();
      x.arc(px, py, 7 + (done || reduce3 ? 0 : Math.sin(tt * 2) * 1.5), 0, 7);
      x.stroke();
      if (done) {
        x.fillStyle = `rgba(${EXO},0.5)`;
        x.beginPath();
        x.arc(px, py, 4, 0, 7);
        x.fill();
      }
      if (fly && s.travel) {
        const k = s.travel.t / s.travel.total;
        x.setLineDash([3, 5]);
        x.strokeStyle = `rgba(${EXO},0.6)`;
        x.beginPath();
        x.moveTo(hx, hy);
        x.lineTo(px, py);
        x.stroke();
        x.setLineDash([]);
        x.fillStyle = `rgb(${EXO})`;
        x.beginPath();
        x.arc(hx + (px - hx) * k, hy + (py - hy) * k, 3, 0, 7);
        x.fill();
      }
      const right = px > g.cx;
      x.font = `12px ${MONO2}`;
      x.textAlign = right ? "left" : "right";
      const lbl = names(id), w = x.measureText(lbl).width, lx = right ? px + 12 : px - 12;
      x.fillStyle = "rgba(8,10,22,0.6)";
      x.fillRect(right ? lx - 3 : lx - w - 3, py - 9, w + 6, 17);
      x.fillStyle = done ? "rgba(176,181,212,0.9)" : "rgba(232,236,255,0.98)";
      x.fillText(lbl, lx, py + 4);
    }
    x.textAlign = "left";
  }
  function galaxyHit(W, H, s, mx, my, open) {
    const g = galGeo(W, H);
    let best = null, bd = 20;
    for (const id of GAL_IDS) {
      if (!open(id) || s.visited[id]) continue;
      const [px, py] = galPos(id, g), d = Math.hypot(mx - px, my - py);
      if (d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
  }

  // src/ui/app.ts
  var PRESTIGE_UNIT = PRESTIGE.metalUnit;
  var PRESTIGE_PER_ORDER = PRESTIGE.perOrder;
  var VOL_KEYS = ["noise", "melody", "game"];
  var VOL_DEFAULT = { noise: 0.7, melody: 1, game: 1 };
  var volOf = (k) => S.settings.vol?.[k] ?? VOL_DEFAULT[k];
  var audioVols = () => ({ noise: volOf("noise"), drone: volOf("noise"), melody: volOf("melody"), pulse: volOf("game"), chime: volOf("game") });
  var VERSION = "0.4";
  var KEY = "sepot-horizontu";
  var $ = (id) => document.getElementById(id);
  var SUP2 = { "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u207B": "\u2212" };
  var esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `<sup>${[...m].map((ch) => SUP2[ch]).join("")}</sup>`).replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `<span class="exp">${m}</span>`).replace(/(?<=\d)[   ](?=\d{3}(?!\d))/g, '<span class="ts"> </span>');
  var S;
  var tab = "build";
  var buyMax = 1;
  var viewKey = "";
  var lastActive = Date.now();
  var COLOR = { ore: "var(--ore)", metal: "var(--metal)", energy: "var(--energy)", data: "var(--data)", plasma: "var(--plasma)", exotic: "var(--exotic)" };
  var UNIT = { ore: "kg", metal: "kg", energy: "J", data: "B", plasma: "kg", exotic: "foam" };
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
    tip.innerHTML = `<b>${esc(t(`unit.${u}.name`))}</b>${esc(t(`unit.${u}.text`) + (u === "K" ? kTypes() : ""))}` + (target.dataset.res ? breakdownHTML(target.dataset.res) : "");
    tip.hidden = false;
    const r = target.getBoundingClientRect(), w = tip.offsetWidth;
    tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left)) + "px";
    tip.style.top = r.bottom + 8 + "px";
  }
  function hideTip() {
    $("tip").hidden = true;
  }
  function kTypes() {
    const n = Math.min(4, (S.chapterDone ?? 0) + 1);
    let out = "";
    for (let i = 1; i <= n; i++) out += " " + t(`unit.K.t${i}`);
    return out;
  }
  function breakdownHTML(r) {
    const { prod, cons } = rateParts(S, r);
    if (!prod.length && !cons.length) return "";
    const name = (k) => k === "reactor" || k === "auto" || k === "home" ? t("ui.breakdown." + k) : k === "net" ? t("ui.breakdown.net4") : t(`b.${k}.name`);
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
    } else if (S.hole.done) {
      renderTop4(k, P);
    } else if (!S.hole.done) {
      const d = phaseDef(S), kT = (Math.log10(d.needW) - 6) / 10, k0 = S.hole.phase ? (Math.log10(PHASES[S.hole.phase - 1].needW) - 6) / 10 : 0.3;
      $("kprogLabel").innerHTML = esc(P >= d.needW ? t("ui.toPhaseDone") : t("ui.toPhase", { k: kValue(kT), n: times(d.needW / P) }));
      $("kbar").style.width = Math.max(0, Math.min(100, (k - k0) / (kT - k0) * 100)).toFixed(1) + "%";
    } else {
      $("kprogLabel").textContent = t("ui.toNext");
      $("kbar").style.width = "100%";
    }
    const shown = RESOURCES.filter((r) => !(r === "ore" && S.chapterDone >= 1) && !(r === "metal" && S.star.done) && !(r === "plasma" && S.hole.done) && (r === "ore" || S.total[r] > 0));
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
      $("clockScale").textContent = S.star.done ? t("ui.outside", { t: years(S.yrs ?? 0) }) : t("ui.clockScale");
      $("clockDay").title = S.star.done ? t("ui.outsideTip") : "";
    }
  }
  var HOLE_CONV = ["injector", "station", "hawking"];
  var CH3_LOCS = ["cas", "oort", "lens", "pulsar", "tde", "cloud", "pole", "dwarf", "ergo", "stream"];
  var STAR_BUILDINGS2 = ["sieve", "corono", "lifter", "separator", "seismo", "swarmfab"];
  var starView = () => ({ stage: stageDef(S).id, dyson: S.b.dyson, lifters: S.b.lifter, coverage: coverage(S), collapse: S.star.collapse, done: S.star.done, snAge: snAge() });
  function renderRig() {
    const ch22 = S.chapterDone >= 1;
    const ch3 = S.star.done, ch42 = S.hole.done;
    $("rigTitle").textContent = ch42 ? t("ui.net.title") : ch3 ? t("ui.hole.title") : ch22 ? t("ui.star.title") : t("ui.asteroid");
    document.body.classList.toggle("ch4", ch42);
    document.body.classList.toggle("ch2", ch22);
    document.body.classList.toggle("ch3", ch3);
    document.body.classList.add("cv");
    const rock = $("rock");
    rock.disabled = ch22;
    rock.setAttribute("aria-label", ch22 ? t("ui.star.title") : t("ui.mineAria"));
    $("clickTag").hidden = ch22;
    $("clickTag").innerHTML = esc(t("ui.perClick", { v: mass(clickPower(S)) }));
    const hint = $("hint");
    hint.hidden = S.b.drone >= 3;
    hint.textContent = t("ui.hint");
    const rows = ch22 ? [] : [[t("ui.stats.clicks"), num(S.clicks)]];
    const slow = (ids) => {
      for (const id of ids.filter((id2) => S.b[id2] >= 1)) {
        const e = S.off[id] ? 0 : S.eff[id] ?? 1;
        if (S.off[id] || e < 0.98) rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round(e * 100) })]);
      }
    };
    if (!ch22) {
      rows.push([t("ui.stats.drones"), num(Math.floor(S.b.drone))]);
      slow(CONVERTERS);
    } else if (ch42) {
      rows.push(...rig4Rows());
    } else if (ch3) {
      rows.push(["\xA7" + t("ui.prod.hole"), ""]);
      rows.push([t("ui.stats.phase"), `${S.hole.phase + 1}/${PHASES.length} \xB7 ${phaseName(S.hole.phase)}`]);
      rows.push([t("ui.hole.L"), power(holeL(S))]);
      if (ventOpen(S)) {
        const v2 = S.vent;
        rows.push([t("ui.vent.tank"), v2.over > 0 ? t("ui.vent.overShort", { s: Math.ceil(v2.over) }) : `${Math.round(ventTank(S) * 100)} %`]);
        rows.push([t("ui.vent.chain"), v2.chain > 1 ? `${v2.chain} \xB7 \xD7${dec(ventChainMult(S), 2)}` : t("ui.vent.best", { n: v2.best })]);
      }
      const { p, c } = rates(S), P = powerW(S);
      rows.push(["\xA7" + t("ui.prod.title"), ""]);
      rows.push([t("ui.prod.power"), power(P)]);
      rows.push([t("res.plasma"), `${p.plasma - c.plasma >= 0 ? "+" : "\u2212"}${mass(Math.abs(p.plasma - c.plasma))}/s`]);
      rows.push([t("res.data"), `+${bytes(p.data - c.data)}/s`]);
      if (S.b.injector >= 1 && injShortOn) rows.push([t("b.injector.name"), t("ui.inj.panelShort")]);
      slow(HOLE_CONV.filter((id) => id !== "injector"));
      if (S.b.yard >= 1) rows.push([t("b.yard.name"), S.off.yard ? t("ui.stopped") : t("ui.yard.panel", { r: num(S.yard?.built.ring ?? 0), j: num(S.yard?.built.jet ?? 0) })]);
    } else if (!S.star.done) {
      rows.push([t("ui.stats.stage"), `${S.star.stage + 1}/${STAGES.length} \xB7 ${stageName(S.star.stage)}`], [t("ui.stats.cov"), pct(coverage(S))]);
      if (S.b.swarmfab >= 1 && !S.off.swarmfab) rows.push([t("b.swarmfab.name"), t("ui.fabRate", { n: num(S.fab?.made ?? 0) })]);
      slow(STAR_BUILDINGS2.filter((id) => id !== "swarmfab"));
    }
    $("stats").innerHTML = rows.map(([a, b]) => a.startsWith("\xA7") ? `<dt class="sec">${esc(a.slice(1))}</dt>` : `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
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
    if (S.hole.done) list.push(["bridge", t("ui.tabs.bridge")]);
    if (S.hole.done) {
    } else if (S.star.done) list.push(["hole", t("ui.tabs.hole")]);
    else if (S.chapterDone >= 1) list.push(["star", t("ui.tabs.star")]);
    return list;
  }
  function renderTabs() {
    const list = tabsAvail();
    if (!list.find(([id]) => id === tab)) tab = "build";
    const dot = RESEARCH_IDS.some((id) => researchAvailable(S, id) && affordable(S, R[id].cost));
    const hdot = !S.hole.done && (phaseReady(S).ok || unseen("hole"));
    const bdot = S.hole.done && (bridgeReady(S).ok || unseen("bridge"));
    const mdot = unseen("map") || LOCATION_IDS.some((id) => !S.visited[id] && locationOpen(S, id) && canTravel(S, id) && chapterLoc(id));
    const sdot = stageReady(S).ok || canRebuild(S) && prestigeGain(S) >= Math.max(4, S.p.pts * 0.5) || unseen("star");
    markSeen();
    const html = list.map(([id, n]) => `<button class="tab" role="tab" aria-selected="${id === tab}" data-tab="${id}">${esc(n)}${(id === "research" && dot || id === "star" && sdot || id === "hole" && hdot || id === "map" && mdot || id === "bridge" && bdot) && tab !== id ? '<span class="dot"></span>' : ""}</button>`).join("");
    const el = $("tabs");
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  function computeKey(which = tab) {
    if (which === "build") return "b" + BUILDING_IDS.filter((id) => isUnlocked(S, id)).join() + buyMax + ventOpen(S) + S.hole.done;
    if (which === "bridge") return `n${S.bridge.stage}${S.bridge.pass >= 0}${S.bridge.done}`;
    if (which === "research") return "r" + RESEARCH_IDS.map((id) => S.r[id] ? 2 : researchAvailable(S, id) ? 1 : 0).join("");
    if (which === "map") return "m" + LOCATION_IDS.map((id) => S.visited[id] ? 1 : locationOpen(S, id) ? 0 : "-").join("") + (S.travel ? S.travel.to : "");
    if (which === "star") return `s${S.star.stage}${S.star.done}${S.star.collapse >= 0}${!!S.r.redesign}`;
    if (which === "hole") return `h${S.hole.phase}${S.hole.dive >= 0}${S.hole.done}`;
    return "s";
  }
  function buildView(which = tab, el = $("view")) {
    var _a, _b, _c;
    let h = "";
    if (which === "build") {
      h += `<div class="toolbar">${esc(t("ui.buyMode"))} <span class="seg"><button data-max="1" aria-pressed="${buyMax === 1}">\xD71</button><button data-max="10" aria-pressed="${buyMax === 10}">\xD710</button><button data-max="max" aria-pressed="${buyMax === true}">Max</button></span></div><div class="list">`;
      S.unl ?? (S.unl = {});
      const fresh = !Object.keys(S.unl).length, items = [];
      const order0 = (k) => UNLOCK_ORDER.indexOf(k) * 1e-3 - 1;
      for (const id of BUILDING_IDS) {
        if (!isUnlocked(S, id)) continue;
        (_a = S.unl)[id] ?? (_a[id] = fresh ? order0(id) : S.time);
        items.push({ key: id, t: S.unl[id] });
      }
      if (ventOpen(S)) {
        (_b = S.unl).vent ?? (_b.vent = fresh ? order0("vent") : S.time);
        items.push({ key: "vent", t: S.unl.vent });
      }
      if (S.hole.done && S.bridge.n >= 1) {
        (_c = S.unl).sync ?? (_c.sync = S.time);
        items.push({ key: "sync", t: S.unl.sync });
      }
      items.sort((a, b) => b.t - a.t);
      for (const { key: id } of items) {
        if (id === "vent") {
          h += ventCards();
          continue;
        }
        if (id === "sync") {
          h += syncCards();
          continue;
        }
        const conv = !!B[id].cons || id === "swarmfab" || id === "jet" || id === "plock" || id === "raider" || id === "router" || id === "yard";
        h += `<div class="item" data-b="${id}"><h3>${esc(t(`b.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`b.${id}.desc`))}</p><div class="eff" data-f="eff"></div><div class="cost" data-f="cost"></div>
      <div class="act"><button class="btn" data-buy="${id}">${esc(t("ui.buy"))}</button>${conv ? `<button class="btn ghost" data-toggle="${id}"></button>` : ""}${id === "swarmfab" ? `<button class="btn ghost" data-sell="${id}"></button>` : ""}</div></div>`;
      }
      h += "</div>";
    } else if (which === "research") {
      const open = RESEARCH_IDS.filter((id) => researchAvailable(S, id));
      const locked = RESEARCH_IDS.filter((id) => !S.r[id] && !researchAvailable(S, id) && R[id].reqKey);
      const done = RESEARCH_IDS.filter((id) => S.r[id]);
      h += '<div class="list">' + (open.length ? open.map((id) => `<div class="item" data-r="${id}"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p><div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-res="${id}">${esc(t("ui.research"))}</button></div></div>`).join("") : `<p class="empty">${esc(t("ui.researchNone"))}</p>`) + "</div>";
      const lockedShown = locked.filter((id, i, a) => a.findIndex((x) => R[x].reqKey === R[id].reqKey) === i);
      if (lockedShown.length) h += `<div class="section-label">${esc(t("ui.researchLocked"))}</div><div class="list">` + lockedShown.map((id) => `<div class="item done"><h3>?</h3><p>${esc(t("ui.needs", { x: t("req." + R[id].reqKey) }))}</p></div>`).join("") + "</div>";
      if (done.length) h += `<div class="section-label">${esc(t("ui.researchDone"))}</div><div class="list">` + done.slice().reverse().map((id) => `<div class="item done"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p></div>`).join("") + "</div>";
    } else if (which === "map") {
      h += '<div class="mapbox"><canvas id="map"></canvas></div><div class="list">';
      for (const id of LOCATION_IDS.slice().reverse()) {
        if (!locationOpen(S, id)) continue;
        if (!chapterLoc(id)) continue;
        const done = !!S.visited[id];
        h += `<div class="item${done ? " visited" : ""}" data-l="${id}"><h3>${esc(t(`loc.${id}.name`))}</h3><p>${esc(t(`loc.${id}.${done ? "done" : "desc"}`))}</p>${done ? "" : '<div class="cost" data-f="cost"></div>'}<div class="act">${done ? `<span class="dim">${esc(t("ui.map.active"))}</span>` : `<button class="btn" data-go="${id}"></button>`}</div></div>`;
      }
      h += "</div>";
    } else if (which === "star") h += starHTML();
    else if (which === "hole") h += holeHTML();
    else if (which === "bridge") h += bridgeHTML();
    el.innerHTML = h;
  }
  var round2 = (v) => {
    const e = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.abs(v) || 1)) - 1));
    return (Math.round(v / e) * e).toLocaleString("cs-CZ");
  };
  var spinTxt = (a) => dec(a, a >= 0.99 ? 3 : 2);
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
    if (REBUILD_ON && S.r.redesign) h += `<div class="stagecard rebuild">
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
    if (REBUILD_ON && S.r.redesign) {
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
  var seenKey = {
    map: () => LOCATION_IDS.filter((id) => locationOpen(S, id) && !S.visited[id]).join(","),
    hole: () => `${S.hole.phase}${S.hole.dive >= 0}${S.hole.done}`,
    star: () => `${S.star.stage}${S.star.collapse >= 0}`
  };
  function unseen(id) {
    const k = seenKey[id]();
    return !!k && (S.seen?.[id] ?? "") !== k;
  }
  function markSeen() {
    if (!seenKey[tab]) return;
    S.seen ?? (S.seen = {});
    S.seen[tab] = seenKey[tab]();
  }
  var sceneZoom = 0;
  var sceneHover = null;
  var sceneHold = false;
  var sceneHoldAcc = 0;
  function sceneAngle(e) {
    const c = $("scenec"), r = c.getBoundingClientRect(), g = sceneGeom(r.width, r.height);
    const dx = (e.clientX - r.left - g.cx) / g.R, dy = (e.clientY - r.top - g.cy) / (g.R * g.tilt);
    return Math.atan2(dy, dx);
  }
  function sceneView() {
    const v = S.vent, open = ventOpen(S);
    const blobs = v.fly.map((b) => {
      const dt0 = S.time - b.t0, p0 = blobPos(b, dt0), trail3 = [];
      for (let k = 9; k >= 1; k--) {
        const q = blobPos(b, Math.max(0, dt0 - k * 0.05));
        trail3.push([q.r, q.th]);
      }
      trail3.push([p0.r, p0.th]);
      return { r: p0.r, th: p0.th, gold: b.gold, mult: b.mult, trail: trail3, auto: !!b.inj };
    });
    const inj = injEmitters(S);
    const fl = flares.splice(0).map((f) => {
      const q = blobPos(f.b, ventFlight(f.b.r0));
      return { r: q.r, th: q.th, gold: f.b.gold, mult: f.b.mult, text: f.b.inj ? "" : `+${bytes(f.data)}${f.b.mult > 1.01 ? ` \xD7${dec(f.b.mult, 2)}` : ""}` };
    });
    return {
      blobs,
      flares: fl,
      inj,
      relR: ventR(ventLv(S, "radius")),
      hover: sceneHover,
      hoverText: t("ui.vent.hover", { kg: mass(ventKg(S)), s: dec(ventFlight(ventR(ventLv(S, "radius"))), 1) }),
      tank: ventTank(S),
      tankText: open ? t("ui.vent.tankLine", { kg: mass(ventTankKg(S)), p: Math.round(ventTank(S) * 100) }) : "",
      chainText: v.chain > 1 ? t("ui.vent.chainBig", { n: v.chain, m: dec(ventChainMult(S), 2) }) : "",
      pulse: pulsePhase(S),
      pulseSec: VENT.pulse,
      overText: v.over > 0 ? t("ui.vent.over", { s: Math.ceil(v.over) }) : "",
      locked: open ? "" : t("ui.vent.locked")
    };
  }
  function renderScene() {
    if (!S.star.done) return;
    if (S.hole.done) {
      renderScene4();
      return;
    }
    const open = ventOpen(S), full = ventCanBurst(S), btn = $("burstBtn");
    btn.hidden = !open || !!sceneZoom;
    btn.disabled = !full;
    btn.classList.toggle("ready", full);
    btn.classList.toggle("ghost", !full);
    btn.textContent = full ? t("ui.vent.burst") : t("ui.vent.burstWait", { p: Math.round(ventTank(S) * 100) });
    const hint = $("sceneHint");
    hint.hidden = !open || !!sceneZoom || S.b.injector >= 1;
    hint.innerHTML = t("ui.vent.flowHelp").split("|").map((x, i) => `<b>${i + 1}</b> ${esc(x)}`).join("<br>");
    document.querySelectorAll("[data-zoom]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.zoom) === sceneZoom)));
  }
  var ventNow = {
    inlet: (l) => t("ui.vent.v.inlet", { p: Math.round(ventShare(S, l) * 100), f: mass(ventFill(S, l)) }),
    valve: (l) => t("ui.vent.v.valve", { kg: mass(Math.min(ventCap(S), ventKg(S, l))), s: dec(VENT.valveSec * Math.pow(1.5, l), 0) }),
    trap: (l) => t("ui.vent.v.trap", { kg: mass(ventCap(S, l)), f: mass(ventFill(S, l)) }),
    radius: (l) => t("ui.vent.v.radius", { r: dec(ventR(l), 2), s: dec(ventFlight(ventR(l)), 1) }),
    coil: (l) => t("ui.vent.v.coil", { n: ventChainMax(l), p: Math.round(ventStep(l) * 100) })
  };
  function ventCards() {
    let h = "";
    for (const id of VENT_IDS) {
      h += `<div class="item vcard" data-vu="${id}"><h3>${esc(t(`ui.vent.u.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`ui.vent.u.${id}.desc`))}</p>
    <div class="eff2 mono"><span class="k">${esc(t("ui.vent.now"))}</span><span data-f="now"></span><span class="k">${esc(t("ui.vent.next"))}</span><span class="up" data-f="next"></span></div>
    <div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-vup="${id}">${esc(t("ui.vent.upgrade"))}</button></div></div>`;
    }
    return h;
  }
  function updateVent(root = $("view")) {
    root.querySelectorAll("[data-vu]").forEach((el) => {
      const id = el.dataset.vu, l = ventLv(S, id), max = l >= VENT_UPS[id].max, c = ventUpCost(S, id);
      const set = (f, html) => {
        const e2 = el.querySelector(`[data-f=${f}]`);
        if (e2.innerHTML !== html) e2.innerHTML = html;
      };
      set("n", esc(t("ui.vent.level", { n: l })));
      set("now", esc(ventNow[id](l)));
      set("next", esc(max ? t("ui.vent.max") : ventNow[id](l + 1)));
      set("cost", max ? "" : costHTML({ plasma: c }));
      el.querySelector("[data-vup]").disabled = max || S.res.plasma < c;
    });
  }
  var phaseName = (i) => i < PHASES.length ? t(`ui.phases.${PHASES[i].id}.name`) : t("ui.hole.diveName");
  var lumOf = (w) => Math.max(0, Math.min(1, (Math.log10(Math.max(1, w)) - 20) / 13));
  function holeView() {
    const jp = jetP(S);
    return {
      phase: PHASES[Math.min(S.hole.phase, PHASES.length - 1)].disk,
      a: S.hole.a,
      lum: lumOf(holeL(S)),
      cov: ringCov(S),
      rings: Math.floor(S.b.ring),
      jets: jp > 0 ? Math.max(0.25, Math.min(1, (Math.log10(jp) - 28) / 7)) : 0,
      jetCov: jetCov(S),
      stations: Math.floor(S.b.station),
      gamma: gamma(S),
      feed: Math.min(8, Math.ceil(Math.floor(S.b.injector) / 6)),
      dive: S.hole.dive,
      done: S.hole.done
    };
  }
  function holeHTML() {
    const ladder = PHASES.map((ph, i) => `<li data-ph="${i}"><span class="num">${i + 1}</span>${esc(t(`ui.phases.${ph.id}.name`))}</li>`).join("") + `<li data-ph="${PHASES.length}"><span class="num">\u2726</span>${esc(t("ui.hole.diveName"))}</li>`;
    let h = `<div class="starbox"><canvas id="holec"></canvas></div><ol class="ladder">${ladder}</ol>`;
    if (S.hole.done) return h + `<div class="stagecard"><p>${esc(t("ui.hole.done"))}</p><dl class="sgrid" data-f="grid"></dl></div>`;
    h += `<div class="stagecard">
  <div class="sc-head"><h3 data-f="name"></h3><span class="tag mono" data-f="of"></span></div>
  <p class="burn" data-f="text"></p>
  <dl class="sgrid" data-f="grid"></dl>
  <div class="sprog"><div class="sp-head"><span class="dim">${esc(t("ui.power"))}</span><span class="mono" data-f="ptext"></span></div><div class="bar"><b data-f="prog"></b></div></div>
  <div class="ready"><span class="dim">${esc(t("ui.hole.ready"))}</span><ul class="checks" data-f="checks"></ul></div>
  <div class="row"><button class="btn" data-phase="1"></button><span class="dim" data-f="wait"></span></div>
</div>`;
    return h;
  }
  function holeGrid() {
    const L0 = holeL(S), rows = [
      [t("ui.hole.mass"), t("ui.hole.msun", { v: HOLE.massSun })],
      [t("ui.hole.rs"), `${dec(HOLE.rsKm, 1)} km`],
      [t("ui.hole.spin"), `${spinTxt(S.hole.a)} \xB7 ${t("ui.hole.spinEq", { v: spinTxt(spinEq(S)) })}`],
      [t("ui.hole.isco"), t("ui.hole.rsUnit", { v: dec(iscoR(S.hole.a) / 2, 2) })],
      [t("ui.hole.eta"), pct(diskEta(S.hole.a))],
      [t("ui.hole.L"), power(L0)],
      [t("ui.hole.edd"), power(HOLE.eddW)],
      [t("ui.hole.cov"), pct(ringCov(S))]
    ];
    if (S.r.mad) rows.push([t("ui.hole.jets"), power(jetP(S))], [t("ui.hole.jetCov"), pct(jetCov(S))]);
    if (S.b.station >= 1) rows.push([t("ui.hole.gamma"), t("ui.hole.stationR", { r: dec(stationR(S), 2), g: dec(gamma(S), gamma(S) >= 10 ? 0 : 1) })]);
    return rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("") + (L0 >= HOLE.eddW * 0.999 && !S.r.slim ? `<dt>&nbsp;</dt><dd class="warnc">${esc(t("ui.hole.eddCap"))}</dd>` : "");
  }
  function updateHole() {
    const view = $("view");
    view.querySelectorAll(".ladder li").forEach((li) => {
      const i = Number(li.dataset.ph), cur = S.hole.done ? PHASES.length + 1 : S.hole.dive >= 0 ? PHASES.length : S.hole.phase;
      li.className = i < cur ? "done" : i === cur ? "cur" : "";
    });
    const set = (f2, html) => {
      const el = view.querySelector(`[data-f=${f2}]`);
      if (el && el.innerHTML !== html) el.innerHTML = html;
    };
    set("grid", holeGrid());
    if (S.hole.done) return;
    const d = phaseDef(S), ph = S.hole.phase, P = powerW(S);
    set("name", esc(phaseName(ph)));
    set("of", esc(t("ui.hole.phase", { n: ph + 1, of: PHASES.length })));
    set("text", esc(t(`ui.phases.${d.id}.text`)));
    const w0 = ph ? PHASES[ph - 1].needW : 1e15, f = Math.max(0, Math.min(1, Math.log10(P / w0) / Math.log10(d.needW / w0)));
    view.querySelector("[data-f=prog]")?.style.setProperty("width", (f * 100).toFixed(1) + "%");
    set("ptext", esc(`${power(P)} / ${power(d.needW)}`));
    const rd = phaseReady(S), chk = (ok, txt) => `<li class="${ok ? "ok" : ""}">${ok ? "\u2713" : "\xB7"} ${esc(txt)}</li>`;
    let c = chk(rd.power, t("ui.hole.needPower", { w: power(d.needW) }));
    if (ph === PHASES.length - 1) c += chk(rd.research, t("ui.hole.needResearch"));
    set("checks", c);
    const btn = view.querySelector("[data-phase]");
    if (btn) {
      const diving = S.hole.dive >= 0;
      btn.disabled = !rd.ok;
      btn.textContent = diving ? t("ui.hole.diving", { t: duration(S.hole.dive) }) : ph === PHASES.length - 1 ? t("ui.hole.dive") : t("ui.hole.next", { n: phaseName(ph + 1) });
      btn.classList.toggle("warn", diving);
      set("wait", esc(diving ? t("ui.hole.diveNote") : rd.ok ? "" : t("ui.hole.waiting")));
    }
  }
  function onPhase() {
    if (!phaseReady(S).ok) return;
    const go = () => {
      if (advancePhase(S)) {
        onJournal(checkJournal(S));
        renderAll();
        save();
      }
    };
    if (S.hole.phase === PHASES.length - 1) confirmModal(t("ui.hole.diveWarn.title"), t("ui.hole.diveWarn.body", { t: duration(HOLE.diveSec) }), t("ui.hole.diveWarn.ok"), t("ui.hole.diveWarn.cancel"), go);
    else go();
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
  var injAvg = 1;
  var injShortOn = false;
  function injShort() {
    if (S.off.injector || S.b.injector < 1) {
      injAvg = 1;
      injShortOn = false;
      return false;
    }
    injAvg += ((S.eff.injector ?? 1) - injAvg) * 0.05;
    if (injShortOn ? injAvg > 0.99 : injAvg < 0.95) injShortOn = !injShortOn;
    return injShortOn;
  }
  function updateView(which = tab, view = $("view")) {
    if (which === "build") {
      if (ventOpen(S)) updateVent(view);
      injShort();
      if (S.hole.done) updateSync(view);
      view.querySelectorAll("[data-b]").forEach((el) => {
        const id = el.dataset.b, d = B[id];
        const count = Math.floor(S.b[id]);
        el.querySelector("[data-f=n]").innerHTML = esc(t("ui.pieces", { n: num(count) }));
        if (CH4_BUILDINGS.includes(id)) {
          el.querySelector("[data-f=eff]").innerHTML = eff4(id, count);
          priceRow(el, id);
          return;
        }
        const flow = (k) => {
          const part2 = (r, v, sign) => `<span><span style="color:${COLOR[r]}">${esc(t("res." + r))}</span> ${sign}${esc(rate(r, v))}</span>`;
          const ins = id === "injector" ? [`<span><span style="color:${COLOR.plasma}">${esc(t("ui.vent.fromTrap"))}</span> \u2212${esc(rate("plasma", consOf(S, id, "plasma") * k))}</span>`] : Object.keys(d.cons ?? {}).map((r) => part2(r, consOf(S, id, r) * k, "\u2212"));
          const outs = Object.keys(d.prod ?? {}).map((r) => part2(r, prodOf(S, id, r) * k, "+"));
          if (id === "injector" && k === 1) {
            const short = injShortOn;
            const g = short ? 0 : diskGain(S, consOf(S, id, "plasma")), L2 = holeL(S);
            const pc = L2 > 0 ? g / L2 * 100 : 0;
            outs.push(`<span><span style="color:${COLOR.energy}">${esc(t("ui.diskGlow"))}</span> +${esc(power(g))}</span>`);
            if (L2 > 0 && !short) outs.push(`<span class="dim">(${esc(g <= 0 ? t("ui.inj.capped") : t("ui.inj.pct", { p: pc < 0.1 ? "< 0,1" : pc.toFixed(pc < 10 ? 1 : 0).replace(".", ",") }))})</span>`);
          } else if (id === "injector") {
            const perKg = feedRate(S) > 0 ? holeL(S) / feedRate(S) : diskEta(S.hole.a) * HOLE.c2;
            outs.push(`<span><span style="color:${COLOR.energy}">${esc(t("ui.diskGlow"))}</span> +${esc(power(consOf(S, id, "plasma") * k * perKg))}</span>`);
          }
          if (d.makes) outs.push(`<span>${esc(t(d.makes.building === "dyson" ? "ui.makesDyson" : "ui.makes", { n: num(makesOf(S, id) * k) }))}</span>`);
          return ins.length ? `${ins.join(" ")} <span class="arrow">\u2192</span> ${outs.join(" ")}` : outs.join(" ");
        };
        let eff = (id === "ring" || id === "jet") && count < 1 ? "" : `<span class="effrow"><span class="lbl">${esc(t("ui.one"))}</span>${flow(1)}</span>`;
        if (count >= 2 || count >= 1 && d.cons) {
          const e = d.cons ? S.off[id] ? 0 : S.eff[id] ?? 1 : 1;
          const shown = id === "injector" ? injAvg : e;
          let note2 = d.cons && (id === "injector" ? injShortOn : e < 0.995) ? ` <span class="dim">(${esc(S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round(shown * 100) }))})</span>` : "";
          if (id === "swarmfab" && !S.off[id] && S.fab?.lim) note2 = ` <span class="dim">(${esc(t("ui.fabLim." + S.fab.lim) + (S.fab.target ? " \xB7 " + t("ui.fabChain." + S.fab.target) : ""))})</span>`;
          const body = e < 5e-3 ? `<span class="dim">${esc(S.off[id] ? t("ui.stopped") : t("ui.starved"))}</span>` : flow(count * e) + note2;
          eff += `<span class="effrow"><span class="lbl">${esc(t("ui.all", { n: num(count) }))}</span>${body}</span>`;
        }
        if (id === "scoop" && ventOpen(S)) eff += `<span class="effrow"><span class="lbl">${esc(t("ui.vent.toTrap"))}</span>${esc(t("ui.vent.toTrapTxt", { p: Math.round(ventShare(S) * 100), f: mass(ventFill(S)) }))}</span>`;
        if (id === "swarmfab" && S.fab?.built && S.fab.built.lifter + S.fab.built.separator > 0) {
          eff += `<span class="effrow"><span class="lbl">${esc(t("ui.fabBuilt"))}</span>${esc(t("ui.fabBuiltList", { l: num(S.fab.built.lifter), s: num(S.fab.built.separator) }))}</span>`;
        }
        if (id === "yard") {
          const y = S.yard, on = !S.off.yard && S.b.yard >= 1;
          eff = `<span class="effrow"><span class="lbl">${esc(t("ui.yard.share"))}</span>${esc(t("ui.yard.shareTxt", { p: Math.round(yardShare(S) * 100) || 10 }))}</span>`;
          if (on && y) {
            const tg = y.target ? t(`b.${y.target}.name`) : "";
            eff += `<span class="effrow"><span class="lbl">${esc(t("ui.yard.takes"))}</span><span><span style="color:${COLOR.plasma}">${esc(t("res.plasma"))}</span> \u2212${esc(rate("plasma", y.rate))}</span>${tg ? ` <span class="arrow">\u2192</span> <span>${esc(tg)}</span>` : ""}</span>`;
            eff += `<span class="effrow"><span class="lbl">${esc(t("ui.yard.next"))}</span>${esc(y.rate > 0 && isFinite(y.eta) ? t("ui.yard.eta", { t: duration(y.eta) }) : t("ui.yard.wait"))}</span>`;
            eff += `<span class="effrow"><span class="lbl">${esc(t("ui.yard.built"))}</span>${esc(t("ui.yard.builtList", { r: num(y.built.ring), j: num(y.built.jet) }))}</span>`;
          }
        }
        if (id === "injector") {
          el.classList.toggle("starvedcard", injShortOn);
          if (injShortOn) eff += `<span class="effnote">${esc(t(ventLv(S, "inlet") >= VENT_UPS.inlet.max ? "ui.inj.shortScoop" : "ui.inj.short"))}</span>`;
        }
        el.querySelector("[data-f=eff]").innerHTML = eff;
        priceRow(el, id);
      });
    } else if (which === "research") {
      view.querySelectorAll("[data-r]").forEach((el) => {
        const id = el.dataset.r;
        el.querySelector("[data-f=cost]").innerHTML = costHTML(R[id].cost);
        el.querySelector("[data-res]").disabled = !affordable(S, R[id].cost);
      });
    } else if (which === "star") updateStar();
    else if (which === "hole") updateHole();
    else if (which === "bridge") updateBridge();
    else if (which === "map") {
      view.querySelectorAll("[data-go]").forEach((b) => {
        const id = b.dataset.go, item = b.closest("[data-l]");
        const cf = item.querySelector("[data-f=cost]");
        if (cf) cf.innerHTML = `${costHTML({ energy: L[id].cost })}<span class="dim">${esc(t("ui.map.flight", { t: duration(travelTime(S, id)) }))}</span>`;
        b.disabled = !canTravel(S, id);
        b.textContent = S.travel?.to === id ? t("ui.map.onWay") : t("ui.map.fly");
      });
    }
  }
  function priceRow(el, id) {
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
  }
  var bviewKey = "";
  var UNLOCK_ORDER = ["drone", "smelter", "solar", "lab", "drill", "mirror", "replicator", "forge", "catcher", "qcomp", "fusion", "dyson", "windnet", "sieve", "corono", "lifter", "separator", "seismo", "swarmfab", "scoop", "ring", "vent", "station", "injector", "jet", "hawking", "yard", "plate", "bswarm", "beacon", "sync", "anchor", "router", "pump", "plock", "raider", "pair", "kcol", "gwdet", "trap"];
  function placeRock() {
    const rw = $("rockwrap"), center = !S.star.done && tab === "build";
    const target = center ? $("scene").querySelector(".scene-wrap") : $("hint").parentElement;
    if (rw.parentElement === target) return;
    if (center) target.prepend(rw);
    else target.insertBefore(rw, $("hint"));
  }
  function renderView(force = false) {
    const split = true;
    document.body.classList.toggle("tabbuild", tab === "build");
    placeRock();
    if (split) {
      const bk = computeKey("build"), bv = $("bview");
      if (force || bk !== bviewKey) {
        bviewKey = bk;
        buildView("build", bv);
      }
      updateView("build", bv);
      if (tab === "build") return;
    } else bviewKey = "";
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
      const day = t("ui.day", { n: e.day.toLocaleString("cs-CZ") }), label22 = e.kind === "story" ? `${t("ui.report")} \xB7 ${day}` : day;
      const body = e.key === "ui.offline" && e.vars?.list ? `${esc(t("ui.offlineHead", { t: String(e.vars.t) }))}<dl class="gains">${String(e.vars.list).split(/\n|, /).map((row) => {
        const [r, v] = row.split(" +");
        return `<dt>${esc(r)}</dt><dd>+${esc(v ?? "")}</dd>`;
      }).join("")}</dl>` : esc(t(e.key, e.vars));
      return `<div class="entry ${e.kind}${fresh && i === 0 ? " new" : ""}"><span class="t">${esc(label22.toUpperCase())}</span>${body}</div>`;
    }).join("");
  }
  function renderChapters() {
    const names = ["c1", "c2", "c3", "c4", "c5"];
    const cur = S.chapterDone;
    const html = `<ol>${names.map((n, i) => {
      const cls = i < cur ? "done" : i === cur ? "cur" : "";
      const label22 = i <= cur ? t("ui.chapters." + n) : t("ui.chapters.locked");
      return `<li class="${cls}"><span class="num">${i + 1}</span>${esc(label22)}</li>`;
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
    } else if (S.chapterDone >= 3 && (!S.story.modal3 || !S.story.ch4intro)) {
      S.story.modal3 = true;
      S.story.ch4intro = true;
      showModal(t("ui.chapterDone3.title"), t("ui.chapterDone3.body"), t("ui.chapterDone3.ok"));
    } else if (S.chapterDone >= 4 && !S.story.modal4) {
      S.story.modal4 = true;
      showModal(t("ui.chapterDone4.title"), t("ui.chapterDone4.body"), t("ui.chapterDone4.ok"));
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
      if (d.phase) {
        onPhase();
        return;
      }
      if (d.vup) {
        if (ventUpgrade(S, d.vup)) {
          if (S.settings.sound) chime();
          renderView();
          renderRig();
        }
        return;
      }
      if (d.sup) {
        if (syncUpgrade(S, d.sup)) {
          if (S.settings.sound) chime();
          renderView();
        }
        return;
      }
      if (d.adv4) {
        onAdvance4();
        return;
      }
      if (d.widen) {
        onWiden(d.widen);
        return;
      }
      if (d.open) {
        onOpen(d.open);
        return;
      }
      if (d.bclose) {
        netSel = null;
        netBubble = null;
        renderBubble();
        return;
      }
      if (d.bsel) {
        netSel = d.bsel;
        S.bridge.sel = d.bsel;
        tab = "bridge";
        renderTabs();
        renderView(true);
        return;
      }
      if (d.burst) {
        if (ventBurst(S) && S.settings.sound) boom();
        renderScene();
        return;
      }
      if (d.zoom !== void 0) {
        sceneZoom = Number(d.zoom);
        renderScene();
        return;
      }
      if (d.act) return settingsAction(d.act, b);
    });
    const sc = $("scenec");
    bindNet(sc);
    sc.addEventListener("pointermove", (e) => {
      if (!S.hole.done) sceneHover = sceneAngle(e);
    });
    sc.addEventListener("pointerleave", () => {
      sceneHover = null;
      sceneHold = false;
    });
    sc.addEventListener("pointerdown", (e) => {
      if (S.hole.done) return;
      if (sceneZoom) {
        const r = sc.getBoundingClientRect(), id = holeMapHit(r.width, r.height, S, e.clientX - r.left, e.clientY - r.top, performance.now() / 1e3);
        if (id) {
          if (canTravel(S, id)) {
            depart(S, id);
            renderAll();
            save();
          }
          return;
        }
        sceneZoom = 0;
        renderScene();
        return;
      }
      sceneHover = sceneAngle(e);
      sceneHold = true;
      sceneHoldAcc = 0;
      sc.setPointerCapture(e.pointerId);
      ventRelease(S, sceneHover);
    });
    sc.addEventListener("pointerup", () => {
      sceneHold = false;
    });
    sc.addEventListener("pointercancel", () => {
      sceneHold = false;
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
        renderScene();
        checkChapterModal();
      }
      saveAcc += dt;
      if (saveAcc > 15) {
        saveAcc = 0;
        save();
      }
      if (S.hole.done) frame4(now / 1e3);
      else if (S.star.done && snAge() > 8) {
        const sc = $("scenec");
        if (tab !== "build") drawHole($("rockc"), holeView(), now / 1e3, t("ui.hole.remnantSub", { r: dec(HOLE.rsKm, 1) }) + ` \xB7 a ${spinTxt(S.hole.a)}`);
        else if (sceneZoom) drawHoleMap(sc, S, holeView(), now / 1e3);
        else drawScene(sc, holeView(), sceneView(), now / 1e3);
        if (sceneHold && sceneHover !== null && !sceneZoom) {
          sceneHoldAcc += dt;
          if (sceneHoldAcc >= 0.32) {
            sceneHoldAcc = 0;
            ventRelease(S, sceneHover);
          }
        }
      } else if (S.chapterDone >= 1) {
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
        if (m) S.hole.done ? drawGalaxy(m, S, now / 1e3, galName, (id) => locationOpen(S, id) || !!S.visited[id]) : S.star.done ? drawHoleMap(m, S, holeView(), now / 1e3) : drawMap(m, S, now / 1e3);
      }
      if (tab === "hole") {
        const c = document.getElementById("holec");
        if (c) drawProfile(c, { ...holeView(), stationR: stationR(S) }, now / 1e3, t("ui.hole.profile"));
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
  var CH4_LOCS = ["flyby", "magnetar", "globular", "kilonova", "frb", "rotation", "bubbles"];
  function chapterLoc(id) {
    if (S.hole.done) return CH4_LOCS.includes(id);
    if (S.star.done) return CH3_LOCS.includes(id);
    return !CH3_LOCS.includes(id) && !CH4_LOCS.includes(id);
  }
  seenKey.bridge = () => `${S.bridge.stage}${S.bridge.pass >= 0}${S.bridge.done}`;
  var nodeName = (n) => n.type === "home" ? t("ui.net.home") : n.name;
  var linkName = (id) => `${nodeName(NODE[S.bridge.links[id].p])} \u2013 ${nodeName(NODE[id])}`;
  var kOf = (w) => (Math.log10(w) - 6) / 10;
  var ly = (d) => `${Math.round(d * MAP.ly).toLocaleString("cs-CZ")} ly`;
  var galName = (id) => id === "home" ? t("ui.net.ourRegion") : id === "sun" ? t("ui.net.sunEarth") : id === "center" ? t("ui.net.center") : id.startsWith("arm.") ? t(`ui.net.arms.${id.slice(4)}`) : t(`loc.${id}.short`);
  var fillTxt = (r) => r > 1.001 ? t("ui.net.fullX", { m: dec(r, r >= 10 ? 0 : 1) }) : t("ui.net.fillPct", { p: Math.round(r * 100) });
  function renderTop4(k, P) {
    if (S.bridge.done) {
      $("kprogLabel").textContent = t("ui.toNext5");
      $("kbar").style.width = "100%";
      return;
    }
    const d = bstageDef(S), st = S.bridge.stage, kT = kOf(d.needW), k0 = st ? kOf(BSTAGES[st - 1].needW) : kOf(S.bridge.holeW || 25e33);
    $("kprogLabel").innerHTML = esc(P >= d.needW ? t("ui.toStageDone") : st === 2 && k >= 3 ? t("ui.toArm", { n: times(d.needW / P) }) : t("ui.toPhase", { k: kValue(kT), n: times(d.needW / P) }));
    $("kbar").style.width = Math.max(0, Math.min(100, (k - k0) / (kT - k0) * 100)).toFixed(1) + "%";
  }
  function trunk() {
    const f = netNow(S);
    let best = "", bv = -1;
    for (const id in S.bridge.links) if (S.bridge.links[id].p === "home" && (f.supply[id] ?? 0) > bv) {
      bv = f.supply[id];
      best = id;
    }
    return best;
  }
  function rig4Rows() {
    const P = powerW(S), st = S.bridge.stage, rows = [];
    rows.push(["\xA7" + t("ui.net.sec"), ""]);
    rows.push([t("ui.net.stage"), S.bridge.done ? t("ui.net.passDone") : `${st + 1}/${BSTAGES.length} \xB7 ${t(`ui.bstages.${BSTAGES[st].id}.name`)}`]);
    rows.push([t("ui.net.power"), power(P)], [t("ui.net.fromHole"), power(S.bridge.holeW)]);
    rows.push([t("ui.net.systems"), `${num(S.bridge.n)} / ${num(revealed(S).length)}`]);
    rows.push([t("ui.net.capture"), pct(capture(S))]);
    if (S.b.trap >= 1) rows.push([t("ui.net.trapCap"), pct(trapCapture(S))]);
    const lk = Object.values(S.bridge.links).filter((l) => l.lk > 0);
    rows.push([t("ui.net.locked"), num(lk.length)]);
    const w = limiter(S);
    rows.push([t("ui.net.worst"), w ? `${nodeName(NODE[w])} \xB7 ${fillTxt(fillOf(S, w))}` : t("ui.net.worstNone")]);
    const { p, c } = rates(S);
    rows.push(["\xA7" + t("ui.prod.title"), ""]);
    rows.push([t("res.exotic"), `${p.exotic - c.exotic >= 0 ? "+" : "\u2212"}${mass(Math.abs(p.exotic - c.exotic))}/s`]);
    rows.push([t("res.data"), `+${bytes(p.data - c.data)}/s`]);
    return rows;
  }
  var effRow = (lbl, body) => `<span class="effrow"><span class="lbl">${esc(lbl)}</span>${body}</span>`;
  var part = (r, v, sign = "+") => `<span><span style="color:${COLOR[r]}">${esc(t("res." + r))}</span> ${sign}${esc(rate(r, v))}</span>`;
  function withOne(id, f) {
    S.b[id] += 1;
    try {
      return f();
    } finally {
      S.b[id] -= 1;
    }
  }
  function eff4(id, count) {
    const d = B[id];
    let h = "";
    if (d.prod) {
      const outs = (k) => Object.keys(d.prod).map((r) => part(r, prodOf(S, id, r) * k)).join(" ");
      h += effRow(t("ui.gives"), outs(1));
      if (count >= 2) h += effRow(t("ui.total"), outs(count));
    }
    const you = t("ui.forYou");
    if (id === "bswarm") h += effRow(you, esc(t("ui.net.eff.swarm", { a: pct(capture(S)), b: pct(withOne(id, () => capture(S))) })));
    if (id === "trap") h += effRow(you, esc(t("ui.net.eff.trap", { a: pct(trapCapture(S)), b: pct(withOne(id, () => trapCapture(S))) })));
    if (id === "anchor") h += effRow(you, esc(t("ui.net.eff.anchor", { a: dec(anchorMult(S), 2), b: dec(withOne(id, () => anchorMult(S)), 2) })));
    if (id === "plate" && S.b.anchor >= 1) h += effRow(t("ui.net.eff.anchorsLbl"), esc(t("ui.net.eff.plateAnchor", { a: dec(anchorMult(S), 2), b: dec(withOne(id, () => anchorMult(S)), 2) })));
    if (id === "beacon") {
      const more = withOne(id, () => revealCount(S)) - revealCount(S), left = NODES.filter((n) => n.rank < 100 && !isRevealed(S, n)).length;
      h += effRow(you, esc(left ? more ? t("ui.net.eff.beacon", { n: Math.min(more, left) }) : t("ui.net.eff.beaconHalf") : t("ui.net.eff.beaconAll")));
    }
    if (id === "pair") h += effRow(you, esc(t("ui.net.eff.pair", { m: dec(S.r.pairs2 ? NET.pairM2 : NET.pairM, 2), t: times(exoMult(S)) })));
    if (id === "plock") {
      const auto = Object.values(S.bridge.links).filter((l) => l.lk > 0 && l.la).length;
      h += effRow(t("ui.net.now"), esc(t("ui.net.eff.plock", { n: num(auto), m: dec(S.r.quiet ? NET.autoM2 : NET.autoM, 2) })));
    }
    if (id === "raider" || id === "router") {
      const r = S.bridge.rate?.[id] ?? 0, tg = S.bridge.target?.[id] ?? "";
      if (S.off[id]) h += effRow(t("ui.net.takes"), `<span class="dim">${esc(t("ui.stopped"))}</span>`);
      else if (count && !tg) h += effRow(t("ui.net.takes"), `<span class="dim">${esc(t(id === "raider" ? "ui.net.eff.raiderIdle" : "ui.net.eff.routerIdle"))}</span>`);
      else if (count) {
        const what = id === "raider" ? t("ui.net.eff.raider", { n: nodeName(NODE[tg]) }) : t("ui.net.eff.router", { n: nodeName(NODE[tg]), a: S.bridge.links[tg].lv, b: S.bridge.links[tg].lv + 1 });
        h += effRow(t("ui.net.takes"), `${part("exotic", r, "\u2212")} <span class="arrow">\u2192</span> <span style="color:var(--exotic)">${esc(what)}</span>`);
      }
      if (S.bridge.made[id]) h += effRow(t("ui.net.made"), esc(t(id === "raider" ? "ui.net.eff.raiderMade" : "ui.net.eff.routerMade", { n: num(S.bridge.made[id]) })));
    }
    return h;
  }
  var syncNow = {
    win: (l) => t("ui.net.sync.v.win", { s: dec(syncWin(S, l), 1) }),
    len: (l) => t("ui.net.sync.v.len", { s: lockLen(S, l) }),
    dbl: (l) => t(l ? "ui.net.sync.v.dbl2" : "ui.net.sync.v.dbl1")
  };
  function syncCards() {
    return SYNC_IDS.map((id) => `<div class="item vcard" data-su="${id}"><h3>${esc(t(`ui.net.sync.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`ui.net.sync.${id}.desc`))}</p>
    <div class="eff2 mono"><span class="k">${esc(t("ui.vent.now"))}</span><span data-f="now"></span><span class="k">${esc(t("ui.vent.next"))}</span><span class="up" data-f="next"></span></div>
    <div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-sup="${id}">${esc(t("ui.vent.upgrade"))}</button></div></div>`).join("");
  }
  function updateSync(root) {
    root.querySelectorAll("[data-su]").forEach((el) => {
      const id = el.dataset.su, l = syncLv(S, id), max = l >= SYNC_UPS[id].max, c = syncCost(S, id);
      const set = (f, html) => {
        const e2 = el.querySelector(`[data-f=${f}]`);
        if (e2.innerHTML !== html) e2.innerHTML = html;
      };
      set("n", esc(t("ui.vent.level", { n: l })));
      set("now", esc(syncNow[id](l)));
      set("next", esc(max ? t("ui.vent.max") : syncNow[id](l + 1)));
      set("cost", max ? "" : costHTML({ exotic: c }));
      el.querySelector("[data-sup]").disabled = max || S.res.exotic < c;
    });
  }
  function bridgeHTML() {
    const ladder = BSTAGES.map((st, i) => `<li data-bs="${i}"><span class="num">${i + 1}</span>${esc(t(`ui.bstages.${st.id}.name`))}</li>`).join("") + `<li data-bs="${BSTAGES.length}"><span class="num">\u2726</span>${esc(t("ui.net.passName"))}</li>`;
    return `<div class="starbox"><canvas id="throatc"></canvas></div>
  <div class="bridgegrid">
  <div class="stagecard"><div class="sc-head"><h3 data-f="bname"></h3><span class="tag mono" data-f="blv"></span></div>
    <dl class="bgrid2" data-f="bgrid"></dl><div class="bar"><b data-f="bfill"></b></div>
    <p class="bnote" data-f="bnote"></p>
    <div class="row"><button class="btn" data-widen="" data-f="wbtn"></button><button class="btn ghost" data-bsel="" data-f="lbtn" hidden></button><span class="dim" data-f="wnow"></span></div>
    <div class="section-label">${esc(t("ui.net.allLinks"))} <span class="dim" data-f="lcount"></span></div><div class="linklist" data-f="links"></div></div>
  <div><ol class="ladder">${ladder}</ol>
  <div class="stagecard">
    <div class="sc-head"><h3 data-f="name"></h3><span class="tag mono" data-f="of"></span></div>
    <p class="burn" data-f="text"></p>
    <div class="sprog"><div class="sp-head"><span class="dim">${esc(t("ui.power"))}</span><span class="mono" data-f="ptext"></span></div><div class="bar"><b data-f="prog"></b></div></div>
    <div class="ready"><span class="dim">${esc(t("ui.net.ready"))}</span><ul class="checks" data-f="checks"></ul></div>
    <div class="row"><button class="btn" data-adv4="1"></button><span class="dim" data-f="wait"></span></div>
  </div></div></div>`;
  }
  function selLink() {
    const sel = netSel ?? S.bridge.sel;
    return sel && S.bridge.links[sel] ? sel : trunk();
  }
  var linksKey = "";
  function updateBridge() {
    const view = $("view"), set = (f2, html) => {
      const el = view.querySelector(`[data-f=${f2}]`);
      if (el && el.innerHTML !== html) el.innerHTML = html;
    };
    const cur = S.bridge.done ? BSTAGES.length + 1 : S.bridge.pass >= 0 ? BSTAGES.length : S.bridge.stage;
    view.querySelectorAll(".ladder li").forEach((li) => {
      const i = Number(li.dataset.bs);
      li.className = i < cur ? "done" : i === cur ? "cur" : "";
    });
    const d = bstageDef(S), st = S.bridge.stage, P = powerW(S);
    if (S.bridge.done) {
      set("name", esc(t("ui.net.passName")));
      set("of", "");
      set("text", esc(t("ui.net.doneText")));
      set("checks", "");
    } else {
      set("name", esc(t(`ui.bstages.${d.id}.name`)));
      set("of", esc(t("ui.net.stageOf", { n: st + 1, of: BSTAGES.length })));
      set("text", esc(t(`ui.bstages.${d.id}.text`)));
      const w0 = st ? BSTAGES[st - 1].needW : S.bridge.holeW || 25e33, f2 = Math.max(0, Math.min(1, Math.log10(P / w0) / Math.log10(d.needW / w0)));
      view.querySelector("[data-f=prog]")?.style.setProperty("width", (f2 * 100).toFixed(1) + "%");
      set("ptext", esc(`${power(P)} / ${power(d.needW)}`));
      const rd = bridgeReady(S), chk = (ok, txt) => `<li class="${ok ? "ok" : ""}">${ok ? "\u2713" : "\xB7"} ${esc(txt)}</li>`;
      let c2 = chk(rd.power, t("ui.hole.needPower", { w: power(d.needW) }));
      if (st === 2) c2 += chk(rd.mission, t("ui.net.needKilonova"));
      if (st === BSTAGES.length - 1) c2 += chk(rd.research, t("ui.net.needPassage"));
      set("checks", c2);
      const btn = view.querySelector("[data-adv4]");
      if (btn) {
        const going = S.bridge.pass >= 0;
        btn.disabled = !rd.ok;
        btn.textContent = going ? t("ui.net.passing", { t: duration(S.bridge.pass) }) : st === BSTAGES.length - 1 ? t("ui.net.pass") : t("ui.net.next", { n: t(`ui.bstages.${BSTAGES[st + 1].id}.name`) });
        btn.classList.toggle("warn", going);
        set("wait", esc(going ? t("ui.net.passNote") : rd.ok ? "" : t("ui.net.waiting")));
      }
    }
    const id = selLink(), f = netNow(S);
    if (!id) {
      set("bname", esc(t("ui.net.noLink")));
      set("bgrid", "");
      set("links", "");
      return;
    }
    const l = S.bridge.links[id], cap = capOf(S, l), sup = f.supply[id] ?? 0, fl = f.flow[id] ?? 0, full = sup > cap * 1.001;
    set("bname", esc(linkName(id)));
    set("blv", esc(t("ui.net.level", { n: l.lv })));
    const rows = [
      [t("ui.net.capacity"), power(cap)],
      [t("ui.net.wants"), power(sup)],
      [t("ui.net.flowHome"), power(fl)],
      [t("ui.net.lock"), l.lk > 0 ? t(l.la ? "ui.net.lockAuto" : "ui.net.lockHand", { m: dec(lockMult(S, l), 2), s: Math.ceil(l.lk) }) : t("ui.net.lockNone")],
      [t("ui.net.length"), ly(linkLen(id, l))]
    ];
    set("bgrid", rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join(""));
    const bf = view.querySelector("[data-f=bfill]");
    if (bf) {
      bf.style.width = (Math.min(1, sup / Math.max(1, cap)) * 100).toFixed(1) + "%";
      bf.classList.toggle("full", full);
    }
    const lim = full ? id : limiter(S, id), lb = view.querySelector("[data-f=lbtn]");
    let note2;
    if (full) note2 = t("ui.net.noteFull", { m: dec(sup / cap, sup / cap >= 10 ? 0 : 1) });
    else if (lim) note2 = t("ui.net.noteOther", { n: linkName(lim), m: fillTxt(fillOf(S, lim)) });
    else note2 = t("ui.net.noteFree");
    set("bnote", esc(note2));
    view.querySelector("[data-f=bnote]")?.classList.toggle("warnc", full);
    if (lb) {
      lb.hidden = !lim || lim === id;
      if (lim && lim !== id) {
        lb.dataset.bsel = lim;
        lb.textContent = t("ui.net.showLink");
      }
    }
    const wb = view.querySelector("[data-f=wbtn]"), c = upCost(S, l.lv);
    if (wb) {
      wb.dataset.widen = id;
      wb.disabled = S.res.exotic < c;
      wb.classList.toggle("ghost", !full);
      wb.innerHTML = esc(t("ui.net.widenBtn", { c: mass(c) }));
    }
    const g = widenGain(S, id);
    set("wnow", esc(g > 0 ? t("ui.net.widenGain", { w: power(g) }) : ""));
    const ids = Object.keys(S.bridge.links).sort((a, b) => fillOf(S, b) - fillOf(S, a));
    set("lcount", esc(`(${ids.length})`));
    const key = ids.map((k) => `${k}${S.bridge.links[k].lv}${Math.round(fillOf(S, k) * 20)}${S.bridge.links[k].lk > 0 ? "z" : ""}`).join() + id;
    if (key !== linksKey) {
      linksKey = key;
      set("links", ids.map((k) => {
        const lk = S.bridge.links[k], r = fillOf(S, k);
        return `<button class="lnk${k === id ? " on" : ""}${r > 1.001 ? " full" : ""}" data-bsel="${k}"><span>${esc(linkName(k))}</span><span class="mono">${lk.lk > 0 ? lk.la ? "\u25C7 " : "\u25C6 " : ""}${esc(t("ui.net.lvShort", { n: lk.lv }))} \xB7 ${esc(fillTxt(r))}</span></button>`;
      }).join(""));
    }
  }
  function onAdvance4() {
    if (!bridgeReady(S).ok) return;
    const go = () => {
      if (bridgeAdvance(S)) {
        onJournal(checkJournal(S));
        renderAll();
        save();
      }
    };
    if (S.bridge.stage === BSTAGES.length - 1) confirmModal(t("ui.net.passWarn.title"), t("ui.net.passWarn.body", { t: duration(NET.passSec) }), t("ui.net.passWarn.ok"), t("ui.net.passWarn.cancel"), go);
    else go();
  }
  var netSel = null;
  var netBubble = null;
  var netHover = null;
  var netHoverLink = null;
  var netDrag = null;
  var dragStart = null;
  var netHelp = null;
  var netFx = { flashes: [], burst: [], tips: [] };
  function netXY(e) {
    const c = $("scenec"), r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, W: r.width, H: r.height };
  }
  function onWiden(id) {
    if (widen(S, id)) {
      netFx.burst.push({ id, t: performance.now() / 1e3 });
      if (S.settings.sound) chime();
      renderAll();
      save();
    }
  }
  function onOpen(to) {
    const from = bestFrom(S, to);
    if (from && openLink(S, from, to)) {
      if (S.settings.sound) chime();
      netBubble = to;
      bubKey = "";
      onJournal(checkJournal(S));
      renderAll();
      save();
    }
  }
  function bindNet(sc) {
    const wrap = sc.parentElement, bub = document.createElement("div");
    bub.id = "netBubble";
    bub.className = "netbubble";
    bub.hidden = true;
    wrap.appendChild(bub);
    const help = document.createElement("button");
    help.id = "netHelpBtn";
    help.className = "iconbtn nethelp";
    help.textContent = "?";
    help.hidden = true;
    help.setAttribute("aria-label", t("ui.net.helpBtn"));
    help.addEventListener("click", () => {
      netHelp = !(netHelp ?? true);
      renderScene4();
    });
    wrap.appendChild(help);
    sc.addEventListener("pointermove", (e) => {
      if (!S.hole.done) return;
      const p = netXY(e), g = netGeo(p.W, p.H);
      netHover = hitNode(g, S, p.x, p.y);
      netHoverLink = netHover ? null : hitLink(g, S, p.x, p.y);
      sc.style.cursor = netHover || netHoverLink ? "pointer" : "default";
      if (dragStart?.id && isConnected(S, dragStart.id) && Math.hypot(p.x - dragStart.x, p.y - dragStart.y) > 6) {
        const to = netHover && !isConnected(S, netHover) ? netHover : null;
        const ok = !!to && canLink(S, dragStart.id, to), cst = to ? openCost(S, dragStart.id, to) : 0;
        const far = !!to && !ok && dist(NODE[dragStart.id], NODE[to]) > NET.reach;
        netDrag = { from: dragStart.id, mx: p.x, my: p.y, to, ok: ok && S.res.exotic >= cst, cost: to ? far ? t("ui.net.tooFar") : `${mass(cst)}${S.res.exotic < cst ? " \xB7 " + t("ui.net.notEnough") : ""}` : "" };
      }
    });
    sc.addEventListener("pointerdown", (e) => {
      if (!S.hole.done) return;
      const p = netXY(e), g = netGeo(p.W, p.H), node = hitNode(g, S, p.x, p.y), link = node ? null : hitLink(g, S, p.x, p.y);
      dragStart = { x: p.x, y: p.y, id: node, link };
      sc.setPointerCapture(e.pointerId);
      if (link) {
        const ok = tapLock(S, link), now = performance.now() / 1e3;
        netFx.flashes.push({ id: link, t: now, ok });
        netFx.tips.push({ x: p.x, y: p.y - 14, t: now, text: ok ? t("ui.net.lockedNow", { s: lockLen(S) }) : S.bridge.links[link].lk > 0 ? t("ui.net.stillLocked", { s: Math.ceil(S.bridge.links[link].lk), w: dec(waveIn(S, link), 1) }) : t("ui.net.waveIn", { s: dec(waveIn(S, link), 1) }), ok });
        if (ok && S.settings.sound) chime();
        netSel = link;
        S.bridge.sel = link;
        netBubble = null;
        renderBubble();
        renderRig();
        onJournal(checkJournal(S));
      }
    });
    const end = (e) => {
      if (!S.hole.done || !dragStart) return;
      const p = netXY(e);
      if (netDrag) {
        if (netDrag.to && netDrag.ok && openLink(S, netDrag.from, netDrag.to)) {
          if (S.settings.sound) chime();
          netBubble = netDrag.to;
          bubKey = "";
          onJournal(checkJournal(S));
          renderAll();
          save();
        }
      } else if (dragStart.id && Math.hypot(p.x - dragStart.x, p.y - dragStart.y) <= 6) {
        netBubble = dragStart.id === "home" ? null : dragStart.id;
        if (dragStart.id !== "home" && S.bridge.links[dragStart.id]) {
          netSel = dragStart.id;
          S.bridge.sel = dragStart.id;
        }
      } else if (!dragStart.link && !dragStart.id) netBubble = null;
      netDrag = null;
      dragStart = null;
      renderBubble();
    };
    sc.addEventListener("pointerup", end);
    sc.addEventListener("pointercancel", () => {
      netDrag = null;
      dragStart = null;
    });
    sc.addEventListener("pointerleave", () => {
      netHover = null;
      netHoverLink = null;
    });
    document.addEventListener("pointerdown", (e) => {
      const m = e.target?.closest?.("#map");
      if (!m || !S.hole.done) return;
      const r = m.getBoundingClientRect(), id = galaxyHit(r.width, r.height, S, e.clientX - r.left, e.clientY - r.top, (x) => locationOpen(S, x));
      if (id && canTravel(S, id)) {
        depart(S, id);
        renderAll();
        save();
      }
    });
  }
  var TYPE_KEY = (n) => `ui.net.types.${n.type}`;
  var bubKey = "";
  function renderBubble() {
    const el = $("netBubble");
    if (!el) return;
    const id = netBubble;
    if (!id || !S.hole.done || tab !== "build" || !NODE[id] || !isRevealed(S, NODE[id])) {
      el.hidden = true;
      bubKey = "";
      return;
    }
    const n = NODE[id], l = S.bridge.links[id], f = netNow(S), from = l ? null : bestFrom(S, id);
    const key = `${id}|${!!l}|${from ?? "-"}`;
    if (key !== bubKey) {
      bubKey = key;
      let h = `<div class="bh"><b>${esc(nodeName(n))}</b><button class="iconbtn" data-bclose="1" aria-label="${esc(t("ui.close"))}">\xD7</button></div><div class="dim">${esc(t(TYPE_KEY(n)))}</div><dl data-f="rows"></dl><p class="dim" data-f="note"></p><div class="row">`;
      if (l) h += `<button class="btn" data-widen="${id}" data-f="act"></button><button class="btn ghost" data-bsel="${id}">${esc(t("ui.net.detail"))}</button>`;
      else if (from) h += `<button class="btn" data-open="${id}" data-f="act"></button>`;
      el.innerHTML = h + "</div>";
    }
    const set = (k, html) => {
      const e2 = el.querySelector(`[data-f=${k}]`);
      if (e2 && e2.innerHTML !== html) e2.innerHTML = html;
    };
    const rows = [[n.type === "stream" ? t("ui.net.streamL") : t("ui.net.L"), power(n.L)], [t("ui.net.fromHome"), ly(n.d)]];
    if (l) rows.push([t("ui.net.sends"), power(nodeOut(S, n))], [t("ui.net.bridge"), `${t("ui.net.level", { n: l.lv })} \xB7 ${fillTxt(fillOf(S, id))}`]);
    set("rows", rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join(""));
    const act = el.querySelector("[data-f=act]");
    if (l) {
      const c2 = upCost(S, l.lv), g2 = widenGain(S, id), lim = fillOf(S, id) > 1.001 ? null : limiter(S, id);
      set("note", esc(g2 > 0 ? t("ui.net.widenGain", { w: power(g2) }) : lim ? t("ui.net.noteOther", { n: linkName(lim), m: fillTxt(fillOf(S, lim)) }) : t("ui.net.noteFree")));
      if (act) {
        act.disabled = S.res.exotic < c2;
        const tx = esc(t("ui.net.widenBtn", { c: mass(c2) }));
        if (act.innerHTML !== tx) act.innerHTML = tx;
      }
    } else if (from) {
      const c2 = openCost(S, from, id);
      set("note", esc(t("ui.net.openFrom", { n: nodeName(NODE[from]), g: power(openGain(S, from, id)) })));
      if (act) {
        act.disabled = S.res.exotic < c2;
        const tx = esc(t("ui.net.openBtn", { c: mass(c2) }));
        if (act.innerHTML !== tx) act.innerHTML = tx;
      }
    } else set("note", esc(t("ui.net.outOfReach", { d: ly(NET.reach) })));
    el.hidden = false;
    const c = $("scenec"), r = c.getBoundingClientRect(), g = netGeo(r.width, r.height), [px, py] = toPx(g, n);
    const w = el.offsetWidth || 260, hh = el.offsetHeight || 160;
    const left = Math.round(Math.max(8, Math.min(r.width - w - 8, px + 18 + w > r.width - 8 ? px - w - 18 : px + 18))), top = Math.round(Math.max(8, Math.min(r.height - hh - 8, py - hh / 2)));
    if (el.style.left !== left + "px") el.style.left = left + "px";
    if (el.style.top !== top + "px") el.style.top = top + "px";
  }
  function renderScene4() {
    $("burstBtn").hidden = true;
    const hint = $("sceneHint"), hb = $("netHelpBtn");
    const show = (netHelp ?? S.bridge.n < 3) && tab === "build";
    hint.hidden = !show;
    if (hb) {
      hb.hidden = tab !== "build";
      hb.setAttribute("aria-pressed", String(show));
    }
    const steps = t("ui.net.help").split("|").map((x, i) => `<b>${i + 1}</b> ${esc(x)}`).join("<br>");
    const html = `${steps}<span class="tipsh">${esc(t("ui.net.tipsTitle"))}</span>${t("ui.net.tips").split("|").map((x) => `\xB7 ${esc(x)}`).join("<br>")}`;
    if (hint.innerHTML !== html) hint.innerHTML = html;
    renderBubble();
  }
  function frame4(time) {
    const sel = selLink(), n = sel ? NODE[sel] : NODE["home"];
    if (tab === "build") {
      const tg = S.bridge.target ?? { raider: "", router: "" }, bo = tg.raider ? bestFrom(S, tg.raider) : null;
      const f = netNow(S), wi = sel ? waveIn(S, sel) : 0;
      drawNet($("scenec"), S, {
        flow: f,
        hover: netHover,
        hoverLink: netHoverLink,
        sel: netSel,
        drag: netDrag,
        raider: S.off.raider ? "" : tg.raider,
        router: S.off.router ? "" : tg.router,
        raiderFrom: bo ?? "",
        raiderP: tg.raider ? S.bridge.bank.raider / Math.max(1, bo ? openCost(S, bo, tg.raider) : 1) : 0,
        pulseText: sel ? t("ui.net.pulseLine", { n: nodeName(NODE[sel]), w: dec(wi, 1) }) : t("ui.net.pulseOnly"),
        flashes: netFx.flashes,
        burst: netFx.burst,
        tips: netFx.tips
      }, time, nodeName);
    } else {
      const sub = sel ? t("ui.net.mouthSub", { d: ly(n.d), n: S.bridge.links[sel].lv }) : t("ui.net.mouthNone");
      drawMouth($("rockc"), n, time, t("ui.net.mouth", { n: nodeName(n) }), sub, sel ? t(TYPE_KEY(n)) : "");
    }
    if (tab === "bridge" && sel) {
      const c = document.getElementById("throatc"), l = S.bridge.links[sel], f = netNow(S);
      if (c) drawThroat(c, {
        a: NODE[l.p],
        b: n,
        lv: l.lv,
        fill: (f.supply[sel] ?? 0) / capOf(S, l),
        lock: l.lk > 0,
        title: t("ui.net.profile"),
        aName: nodeName(NODE[l.p]),
        bName: nodeName(n),
        lines: [t("ui.net.level", { n: l.lv }), t("ui.net.throatR", { r: sci(3e5 * Math.pow(NET.capG, l.lv / 2), 1) }), t("ui.net.exoHeld", { m: mass(upCost(S, l.lv) * 2) })]
      }, time);
    }
  }

  // src/main.ts
  setLang("cs");
  start();
})();
