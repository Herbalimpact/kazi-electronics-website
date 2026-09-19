// Maudhui ya Kiswahili. Pacha wake ni en.js — yaweke katika muundo mmoja.
// NOTE FOR REVIEWER: please check the technical terms — e.g. "mfumo endeshi" (operating system),
// "mashine za photocopy", "mashine za kuhesabu pesa" (bill counters), "job card", "ankara" (invoice), "usimikaji" (installation).
// Edit ONLY the words between the quote marks. If a word needs an apostrophe (like ng'ombe), write it as ng\'ombe.
module.exports = {
  lang: 'sw',
  ogLocale: 'sw_TZ',
  langSwitch: { label: 'English', short: 'EN', aria: 'Switch language to English' },

  slugs: {
    home: '', about: 'kuhusu-sisi', products: 'bidhaa', services: 'huduma', projects: 'miradi',
    quote: 'omba-bei', contact: 'wasiliana-nasi', faq: 'maswali', privacy: 'faragha'
  },

  ui: {
    skip: 'Ruka hadi maudhui', menu: 'Menyu', close: 'Funga', nav: 'Menyu kuu',
    call: 'Piga', whatsapp: 'WhatsApp', chatWhatsapp: 'Tuandikie WhatsApp', callNow: 'Piga sasa',
    quote: 'Omba bei', quoteShort: 'Bei', seeAll: 'Ona zote',
    hours: 'Jumatatu–Ijumaa, 8:00–17:00', hoursLong: 'Jumatatu hadi Ijumaa, saa 2:00 asubuhi hadi saa 11:00 jioni',
    closedNote: 'Tumefunga Jumamosi, Jumapili na siku za sikukuu za umma.',
    findUs: 'Tupate', openMaps: 'Fungua kwenye Google Maps', address: 'Anwani', phone: 'Simu', email: 'Barua pepe',
    openingHours: 'Saa za kazi', photoSoon: 'Picha zinakuja hivi karibuni', placeholderNote: 'Nafasi ya picha',
    footerAbout: 'Kompyuta, vichapishi, mitandao na mashine za ofisini: tunauza, kusimika na kutengeneza Dar es Salaam tangu 2008.',
    quickLinks: 'Viungo vya haraka', contactUs: 'Mawasiliano', legal: 'Kisheria', privacy: 'Sera ya faragha',
    rights: 'Haki zote zimehifadhiwa.', regNo: 'Cheti cha Usajili Na.',
    subscribeTitle: 'Pata ofa na habari', subscribeText: 'Barua pepe za mara kwa mara kuhusu bidhaa mpya na ofa.',
    subscribeLabel: 'Barua pepe yako', subscribeBtn: 'Jisajili',
    subscribeOk: 'Asante. Umeongezwa kwenye orodha.', subscribeErr: 'Hatukuweza kukusajili. Tafadhali jaribu tena baadaye.',
    waHello: 'Habari Kazi Electronics, nina swali.',
    waQuote: 'Habari Kazi Electronics, ningependa kupata bei.',
    langAria: 'Lugha', faqShort: 'Maswali'
  },

  nav: [
    ['products', 'Bidhaa'], ['services', 'Huduma'], ['projects', 'Miradi na wateja'],
    ['about', 'Kuhusu sisi'], ['contact', 'Wasiliana']
  ],

  categories: [
    { id: 'laptops',    name: 'Kompyuta mpakato na tablet',          blurb: 'Kwa ofisini, shuleni na nyumbani' },
    { id: 'desktops',   name: 'Kompyuta za mezani',                  blurb: 'Za chapa na zilizounganishwa kwa mahitaji yako' },
    { id: 'printers',   name: 'Vichapishi na skana',                 blurb: 'Laser, inkjet, ink tank, dot-matrix' },
    { id: 'copiers',    name: 'Mashine za photocopy na za ofisini',  blurb: 'Photocopy, kuhesabu pesa, plotter' },
    { id: 'networking', name: 'Vifaa vya mtandao',                   blurb: 'Router, Wi-Fi, switch, nyaya' },
    { id: 'security',   name: 'CCTV na mahudhurio',                  blurb: 'Kamera na mashine za alama za vidole' },
    { id: 'power',      name: 'Umeme wa akiba',                      blurb: 'UPS kwa kompyuta na ofisi' },
    { id: 'aircon',     name: 'Viyoyozi',                            blurb: 'Split unit, tunauza na kuhudumia' },
    { id: 'supplies',   name: 'Vifaa saidizi na vya matumizi',       blurb: 'Wino, toner, karatasi, memori, vifaa vya ziada' }
  ],

  stock: { in_stock: 'Ipo', low: 'Zimebaki chache', out: 'Imeisha', order: 'Inaagizwa', ask: 'Piga simu kuthibitisha' },

  home: {
    title: 'Kazi Electronics Services | Kompyuta, Vichapishi, Mitandao na Ukarabati Dar es Salaam',
    description: 'Nunua kompyuta mpakato, vichapishi, vifaa vya mtandao na CCTV, au tengeneza kompyuta na mashine za ofisini. Kazi Electronics Services, Samora Avenue, Dar es Salaam.',
    hero: {
      h1: 'Tunauza. Tunasimika. Tunahudumia.',
      lead: 'Kompyuta mpakato, vichapishi, mashine za photocopy, mitandao na kamera za CCTV kwa nyumba, ofisi na taasisi. Nunua, simikisha na tengenezesha mahali pamoja, Samora Avenue, Dar es Salaam.',
      photoAlt: 'Ndani ya duka la Kazi Electronics Services, likiwa na kompyuta mpakato, vichapishi na vifaa vya mtandao',
      since: 'Tunahudumia Dar es Salaam tangu 2008'
    },
    intents: {
      title: 'Unahitaji nini leo?',
      items: [
        { icon: 'cart', title: 'Nunua vifaa', text: 'Kompyuta mpakato, kompyuta za mezani, vichapishi, mashine za photocopy, vifaa vya mtandao na zaidi. Tuambie unachohitaji, tukutumie bei kwa maandishi.', cta: 'Angalia bidhaa', page: 'products' },
        { icon: 'wrench', title: 'Tengeneza kifaa chako', text: 'Kompyuta, vichapishi, mashine za photocopy, mashine za kuhesabu pesa na viyoyozi. Tunakuja kwako inapowezekana, au tunatengeneza karakana yetu inapobidi.', cta: 'Omba ukarabati', page: 'quote', type: 'repair' },
        { icon: 'network', title: 'Andaa ofisi yako', text: 'Mitandao ya LAN, Wi-Fi, kamera za CCTV, mashine za mahudhurio na umeme wa akiba, vinasimikwa na kujaribiwa.', cta: 'Uliza kuhusu usimikaji', page: 'quote', type: 'installation' }
      ]
    },
    categories: { title: 'Tunachouza', text: 'Chagua kundi uone vilivyopo dukani.' },
    featured: { title: 'Bidhaa teule', text: 'Uliza bei na upatikanaji wa leo. Tunathibitisha vyote kwa maandishi.', all: 'Ona bidhaa zote' },
    process: {
      title: 'Jinsi ukarabati unavyofanyika',
      text: 'Hatua tano zilezile kwa kompyuta ya nyumbani au mashine ya photocopy ya ofisi.',
      steps: [
        { title: 'Tuambie tatizo', text: 'Piga simu, tuandikie WhatsApp, tuma fomu, au lete kifaa dukani.' },
        { title: 'Tunachunguza', text: 'Fundi anakagua kifaa kwako. Kama hakiwezi kutengenezwa hapo, tunakipeleka karakana yetu.' },
        { title: 'Unakubali gharama', text: 'Gharama ya kazi na vipuri tunakubaliana nawe kabla ya kubadilisha chochote.' },
        { title: 'Tunatengeneza na kujaribu', text: 'Usafi, kubadilisha vipuri, kusafisha programu na virusi. Kisha tunajaribu kila kitu.' },
        { title: 'Job card na ankara', text: 'Unasaini job card kuthibitisha kazi imekamilika, nasi tunakupa ankara.' }
      ]
    },
    business: {
      title: 'Mikataba ya matengenezo kwa ofisi na taasisi',
      text: 'Endelea kutumia kompyuta, vichapishi na mashine za photocopy bila usumbufu, kwa ziara za mara kwa mara badala ya dharura.',
      points: [
        'Matengenezo ya kinga kila robo mwaka, au kadri ofisi yako inavyohitaji',
        'Msaada wa haraka kwa simu na papo hapo ofisini',
        'Kipaumbele cha kwanza kwa wateja wa mkataba',
        'Utunzaji makini wa data yako, hasa kwenye diski ngumu'
      ],
      cta: 'Uliza kuhusu mkataba'
    },
    clients: { title: 'Tunaaminiwa na taasisi mbalimbali nchini Tanzania', text: 'Baadhi ya wateja tunaowauzia na kuwahudumia.', all: 'Ona wateja wote' },
    print: {
      title: 'Tunabuni. Tunachapisha.',
      text: 'Nembo, brosha, kadi za biashara, vitabu vya ankara na risiti, mabango, kalenda, letterheads, fulana na chapa.',
      cta: 'Omba bei ya uchapishaji'
    },
    projects: { title: 'Kazi za hivi karibuni', text: 'Usimikaji wa mitandao, CCTV na ofisi.', all: 'Ona miradi yote' },
    testimonials: { title: 'Wateja wanasemaje' },
    brands: { title: 'Chapa tunazouza', text: 'Zinapatikana kupitia wauzaji wa ndani wa chapa hizi. Unahitaji chapa nyingine? Tuulize.' },
    cta: { title: 'Hujui unachohitaji?', text: 'Tuambie tatizo au bajeti yako. Tunajibu ndani ya saa za kazi.' }
  },

  about: {
    title: 'Kuhusu Sisi | Kazi Electronics Services',
    description: 'Kampuni ya Dar es Salaam inayouza, kusimika na kutengeneza kompyuta, vichapishi, mashine za photocopy na mitandao tangu 2008.',
    h1: 'Kuhusu Kazi Electronics Services',
    lead: 'Tunauza kompyuta na mashine za ofisini, na tunazitunza baadaye.',
    story: [
      'Kazi Electronics Services ni kampuni binafsi iliyosajiliwa Tanzania mwezi Aprili 2008 (Cheti cha Usajili Na. 179861). Makao yetu ni Dar es Salaam, na kazi yetu kuu ni kompyuta, mashine za ofisini na mitandao inayoziunganisha.',
      'Kampuni nyingi huuza kompyuta, mashine za photocopy na vichapishi lakini hazitoi huduma ya ukarabati wala matengenezo baada ya mauzo. Sisi tunaziba pengo hilo. Tunahudumia, kuboresha na kutengeneza vifaa vya kompyuta na mashine za ofisini, na pia tunauza vifaa hivyo.'
    ],
    commitmentsTitle: 'Jinsi tunavyofanya kazi',
    commitments: [
      { title: 'Mafundi wenye uzoefu', text: 'Mafundi wa kudumu katika kila fani, na wataalamu wa muda tunapohitaji kwa kazi maalum.' },
      { title: 'Utunzaji wa data yako', text: 'Mafundi wetu hushughulikia data yoyote wanayokutana nayo wakati wa kuhudumia vifaa, hasa diski ngumu, kwa uangalifu mkubwa.' },
      { title: 'Nchi nzima', text: 'Tunafanya kazi Dar es Salaam na tunaweza kutembelea miji mingine ya Tanzania kwa makubaliano.' },
      { title: 'Kwanza papo hapo', text: 'Ukarabati mwingi hufanyika kwenye eneo lako. Mashine ikihitaji kazi zaidi, tunaipeleka karakana yetu.' }
    ],
    whatTitle: 'Tunachofanya',
    whatText: 'Kuuza, kusimika, kutengeneza na kutunza kompyuta na vifaa vya ofisini, pamoja na ubunifu wa michoro na uchapishaji.',
    whatLink: 'Ona huduma zote',
    teamTitle: 'Timu yetu',
    teamText: 'Wahandisi wa programu, mafundi wa vifaa, wahandisi wa vichapishi na mashine za photocopy, na wahudumu wa wateja.',
    teamSlots: ['Mafundi kazini', 'Wahandisi wa programu na mitandao', 'Mauzo na huduma kwa wateja'],
    workshopTitle: 'Karakana yetu',
    workshopText: 'Vifaa vya kutengeneza kompyuta, kusimika mitandao na kutafuta hitilafu.',
    workshopSlots: ['Meza ya ukarabati', 'Upimaji na uchunguzi'],
    detailsTitle: 'Taarifa za kampuni',
    details: [['Jina la kisheria', 'Kazi Electronics Services'], ['Ilisajiliwa', 'Aprili 2008, Tanzania'], ['Cheti cha Usajili', 'Na. 179861'], ['Anwani ya posta', 'S.L.P. 13700, Dar es Salaam']],
    visitTitle: 'Tutembelee'
  },

  products: {
    title: 'Bidhaa | Kazi Electronics Services',
    description: 'Kompyuta mpakato, kompyuta za mezani, vichapishi, mashine za photocopy, mitandao, CCTV, UPS na viyoyozi. Omba bei Kazi Electronics Services, Dar es Salaam.',
    h1: 'Bidhaa',
    lead: 'Bei ni mwongozo tu. Ongeza unachohitaji kwenye orodha ya bei, nasi tunathibitisha bei na upatikanaji kwa maandishi.',
    search: 'Tafuta bidhaa', searchPh: 'Tafuta kwa jina au chapa',
    category: 'Kundi', allCategories: 'Makundi yote',
    brand: 'Chapa', allBrands: 'Chapa zote',
    availability: 'Upatikanaji', anyAvailability: 'Yoyote', onlyInStock: 'Zilizopo tu',
    results: (n) => n + ' bidhaa',
    clear: 'Futa vichujio',
    contactPrice: 'Wasiliana kwa bei', from: 'TSh',
    add: 'Ongeza kwenye bei', added: 'Imeongezwa', inQuote: 'Ipo kwenye orodha yako',
    askWa: 'Uliza WhatsApp', details: 'Maelezo', specs: 'Vipimo',
    empty: 'Hakuna bidhaa inayolingana na utafutaji wako. Futa vichujio, au tuulize. Mara nyingi tunaweza kukutafutia kisichoorodheshwa.',
    loadErr: 'Hatukuweza kupakia orodha ya bidhaa. Tafadhali tupigie au tuandikie WhatsApp.',
    loading: 'Inapakia bidhaa',
    noscript: 'Tafadhali washa JavaScript kuona orodha ya bidhaa, au tupigie +255 715 267 903.',
    quoteBar: (n) => n + ' kwenye orodha yako ya bei',
    viewQuote: 'Angalia orodha ya bei',
    waProduct: (name) => 'Habari Kazi Electronics, ninavutiwa na: ' + name + '. Tafadhali nitumie bei na upatikanaji.',
    updatedNote: 'Timu yetu ya mauzo husasisha orodha hii mara kwa mara. Upatikanaji unaweza kubadilika ndani ya siku.'
  },

  services: {
    title: 'Huduma | Kazi Electronics Services',
    description: 'Kuuza, kusimika, kutengeneza na kutunza kompyuta, vichapishi, mashine za photocopy, mitandao na CCTV, pamoja na ubunifu na uchapishaji Dar es Salaam.',
    h1: 'Huduma',
    lead: 'Kuuza, kusimika, kutengeneza na kutunza kompyuta na mashine za ofisini, pamoja na ubunifu na uchapishaji.',
    items: [
      { id: 'sales', icon: 'cart', title: 'Mauzo', text: 'Kompyuta mpya, vichapishi, mashine za photocopy, vifaa vya mtandao na vifaa vya matumizi kwa watu binafsi, biashara na taasisi. Oda kubwa na za makampuni zinakaribishwa.', list: ['Kompyuta, kompyuta mpakato na tablet', 'Vichapishi, skana na mashine za photocopy', 'Vifaa vya mtandao na vifaa saidizi', 'Vifaa vya ofisi na vya matumizi', 'UPS na umeme wa akiba'], cta: 'Omba bei', type: 'products' },
      { id: 'installation', icon: 'network', title: 'Usimikaji', text: 'Tunapanga, kusimika na kujaribu mifumo ambayo ofisi yako inaitegemea, kisha tunakukabidhi mfumo unaofanya kazi.', list: ['Mitandao ya eneo la ndani (LAN)', 'Mitandao ya eneo pana (WAN)', 'Kamera za CCTV', 'Mashine za mahudhurio kwa alama za vidole', 'Kuunganisha kompyuta kamili na kusimika programu'], cta: 'Uliza kuhusu usimikaji', type: 'installation' },
      { id: 'repair', icon: 'wrench', title: 'Ukarabati na uboreshaji', text: 'Uchunguzi wa kina na ukarabati wa kompyuta, vichapishi, mashine za photocopy na mashine nyingine za ofisini, kwenye eneo lako au karakana yetu.', list: ['Kuondoa virusi na spyware', 'Kusafisha na kusimika upya mfumo endeshi', 'Kuboresha vifaa na memori', 'Kurejesha data na kutambua hitilafu za vifaa', 'Kubadilisha betri', 'Photocopy, vichapishi, fax, mashine za kuhesabu pesa, plotter na mashine za lamination', 'Kuhudumia viyoyozi', 'Matengenezo ya simu'], cta: 'Omba ukarabati', type: 'repair' },
      { id: 'contracts', icon: 'shield', title: 'Mikataba ya matengenezo', text: 'Msaada wa mara kwa mara kwa ofisi zisizoweza kusimama kazi. Wateja wa mkataba hupewa kipaumbele cha kwanza.', list: ['Matengenezo ya kinga kila robo mwaka, au kadri ofisi yako inavyohitaji', 'Kusafisha vifaa, kuondoa vumbi, kusasisha programu na kuondoa virusi', 'Msaada wa haraka kwa simu na papo hapo', 'Ukarabati na uboreshaji ukiombwa'], cta: 'Uliza kuhusu mkataba', type: 'contract' },
      { id: 'consulting', icon: 'cap', title: 'Ushauri wa TEHAMA na mafunzo', text: 'Tunatathmini mahitaji ya ofisi yako kabla hujanunua, na tunafundisha wafanyakazi wako mahali pa kazi.', list: ['Tathmini ya mahitaji na ushauri wa TEHAMA', 'Mafunzo ya ndani kwa timu yako'], cta: 'Uliza kuhusu ushauri', type: 'other' },
      { id: 'print', icon: 'pen', title: 'Ubunifu na uchapishaji', text: 'Vifaa vya mawasiliano na masoko vinavyobuniwa na kuchapishwa kwa ajili ya biashara yako.', list: ['Kubuni nembo na chapa', 'Brosha, kadi za biashara na letterheads', 'Vitabu vya ankara, proforma na risiti', 'Mabango, uchapishaji mkubwa na wa kidijitali', 'Kalenda, fulana, udarizi na uchapishaji wa screen'], cta: 'Omba bei ya uchapishaji', type: 'print' }
    ],
    termsTitle: 'Ni vizuri kujua',
    terms: [
      ['Tunapofanya kazi', 'Kwenye eneo lako Dar es Salaam na miji mingine ya Tanzania. Hitilafu ikishindikana kutatuliwa papo hapo, tunapeleka mashine karakana yetu.'],
      ['Saa za huduma', 'Jumatatu hadi Ijumaa, 8:00 hadi 17:00, isipokuwa sikukuu za umma na wikendi.'],
      ['Vipuri', 'Gharama na upatikanaji wa vipuri tunakubaliana nawe kabla ya kuvifunga.'],
      ['Malipo ya kazi za mkataba', 'Tunatoa ankara baada ya kila huduma ya kawaida kukamilika, pamoja na job card iliyosainiwa na mtumiaji aliyeidhinishwa.']
    ]
  },

  projects: {
    title: 'Miradi na Wateja | Kazi Electronics Services',
    description: 'Usimikaji wa mitandao, CCTV na ofisi uliofanywa na Kazi Electronics Services, na baadhi ya taasisi tunazouzia na kuhudumia.',
    h1: 'Miradi na wateja',
    lead: 'Usimikaji tuliokamilisha, na baadhi ya taasisi zinazotutegemea.',
    projectsTitle: 'Usimikaji',
    projectSlots: [
      { file: 'lan-1', label: 'Usimikaji wa LAN' }, { file: 'lan-2', label: 'Mtandao wa ofisi na Wi-Fi' },
      { file: 'cctv-1', label: 'Usimikaji wa CCTV' }, { file: 'cctv-2', label: 'Chumba cha kudhibiti CCTV' }
    ],
    projectsEmpty: 'Picha za miradi zinakuja hivi karibuni. Tuulize kuhusu kazi inayofanana.',
    clientsTitle: 'Wateja wetu',
    clientsText: 'Tuna wateja wengi: watu binafsi, taasisi na makampuni. Hawa ni sehemu ndogo ya wateja wa hivi karibuni.',
    textClients: ['Wizara ya Afya', 'Wakili Mkuu wa Serikali'],
    cta: 'Unapanga kitu kama hiki?'
  },

  quote: {
    title: 'Omba Bei | Kazi Electronics Services',
    description: 'Omba bei kutoka Kazi Electronics Services kwa vifaa, ukarabati, usimikaji au matengenezo. Tunajibu ndani ya saa za kazi.',
    h1: 'Omba bei',
    lead: 'Tuambie unachohitaji. Tunajibu ndani ya saa za kazi, Jumatatu hadi Ijumaa, 8:00 hadi 17:00.',
    types: [
      ['products', 'Nunua vifaa'], ['repair', 'Ukarabati au huduma'], ['installation', 'Usimikaji (LAN, CCTV, umeme)'],
      ['contract', 'Mkataba wa matengenezo'], ['print', 'Ubunifu na uchapishaji'], ['other', 'Jambo lingine']
    ],
    fields: {
      type: 'Unahitaji nini?', name: 'Jina lako', phone: 'Simu (WhatsApp kama inawezekana)', email: 'Barua pepe (si lazima)',
      org: 'Kampuni au taasisi (si lazima)', place: 'Uko wapi? (eneo la Dar es Salaam au mji)',
      message: 'Tueleze zaidi', messagePh: 'Vifaa, idadi, hitilafu unayoona, bajeti yako, au unapohitaji.',
      lang: 'Jibu kwa', langEn: 'Kiingereza', langSw: 'Kiswahili'
    },
    consent: 'Ukituma fomu hii unakubali tuwasiliane nawe kuhusu ombi lako.',
    privacyLink: 'Sera ya faragha',
    send: 'Tuma ombi', sending: 'Inatuma',
    basketTitle: 'Orodha yako ya bei', basketEmpty: 'Bado hujaongeza bidhaa.', basketBrowse: 'Angalia bidhaa',
    qty: 'Idadi', remove: 'Ondoa',
    errRequired: 'Tafadhali weka jina lako na namba ya simu au barua pepe.',
    errSend: 'Hatukuweza kutuma ombi lako. Jaribu tena, au litume kupitia WhatsApp.',
    okTitle: 'Ombi limepokelewa',
    okText: (name, ref) => 'Asante' + (name ? ', ' + name : '') + '. Namba yako ya kumbukumbu ni ' + ref + '. Tutajibu ndani ya saa za kazi.',
    okWa: 'Endelea kwenye WhatsApp',
    fallbackNote: 'Ombi lako litafunguka kwenye WhatsApp ili ulitume kwetu moja kwa moja.',
    waIntro: 'Habari Kazi Electronics, ningependa kupata bei.',
    waLabels: { type: 'Ombi', name: 'Jina', phone: 'Simu', email: 'Barua pepe', org: 'Taasisi', place: 'Mahali', message: 'Maelezo', items: 'Bidhaa' },
    altTitle: 'Unapendelea kuzungumza?', altText: 'Tuandikie au tupigie ndani ya saa za kazi.'
  },

  contact: {
    title: 'Wasiliana Nasi | Kazi Electronics Services',
    description: 'Tutembelee Kazi Electronics Services, Jengo la Matasalamat, Samora Avenue, Dar es Salaam, au tupigie, tuandikie WhatsApp au barua pepe.',
    h1: 'Wasiliana nasi',
    lead: 'Tembelea duka, tupigie, au tuandikie. Tunajibu ndani ya saa za kazi.',
    formTitle: 'Tutumie ujumbe',
    faqTitle: 'Majibu ya haraka', faqLink: 'Soma maswali yote'
  },

  faq: {
    title: 'Maswali | Kazi Electronics Services',
    description: 'Majibu kuhusu saa za kazi, ukarabati, bei, maeneo tunayohudumia, mikataba ya matengenezo na malipo katika Kazi Electronics Services.',
    h1: 'Maswali yanayoulizwa mara kwa mara',
    lead: 'Hukupata jibu lako? Tuandikie WhatsApp.',
    items: [
      ['Saa zenu za kazi ni zipi?', 'Tunafanya kazi Jumatatu hadi Ijumaa, 8:00 hadi 17:00. Tumefunga Jumamosi, Jumapili na siku za sikukuu za umma.'],
      ['Mko wapi?', 'Jengo la Matasalamat, kando ya Samora Avenue, katikati ya jiji la Dar es Salaam.'],
      ['Ninapataje bei?', 'Ongeza bidhaa kwenye orodha yako ya bei, au tuambie unachohitaji kupitia fomu ya bei au WhatsApp. Tunajibu kwa bei iliyoandikwa ndani ya saa za kazi. Bei zilizo kwenye tovuti ni mwongozo tu.'],
      ['Mnatengeneza ofisini kwangu au karakana yenu?', 'Papo hapo kila inapowezekana. Mashine ikihitaji uchunguzi wa kina au ukarabati maalum, tunaipeleka karakana yetu.'],
      ['Mnahudumia maeneo gani?', 'Dar es Salaam na miji mingine ya Tanzania kwa makubaliano.'],
      ['Mna mikataba ya matengenezo?', 'Ndiyo. Wateja wa mkataba hupata matengenezo ya kinga kila robo mwaka (au kadri ofisi yako inavyohitaji), msaada wa haraka kwa simu na papo hapo, na kipaumbele cha kwanza.'],
      ['Nani hulipia vipuri?', 'Gharama na upatikanaji wa vipuri tunakubaliana nawe kabla ya kuvifunga.'],
      ['Malipo hufanyikaje?', 'Kwa kazi za mkataba tunatoa ankara baada ya kila huduma ya kawaida kukamilika, pamoja na job card iliyosainiwa na mtumiaji aliyeidhinishwa. Kwa manunuzi, tunathibitisha maelezo ya malipo kwenye bei tunayokutumia.'],
      ['Data yangu iko salama mnapotengeneza kompyuta yangu?', 'Mafundi wetu hushughulikia data yoyote wanayokutana nayo, hasa kwenye diski ngumu, kwa uangalifu mkubwa. Hifadhi nakala ya faili muhimu kabla ya ukarabati inapowezekana.'],
      ['Vifaa vinakuja na dhamana?', 'Dhamana inategemea bidhaa na msambazaji. Tunataja dhamana kwenye bei tunayokutumia.'],
      ['Mnauzia biashara na taasisi?', 'Ndiyo. Tunauza na kuhudumia watu binafsi, makampuni na taasisi za umma, ikiwemo oda kubwa.']
    ]
  },

  privacy: {
    title: 'Sera ya Faragha | Kazi Electronics Services',
    description: 'Jinsi Kazi Electronics Services inavyokusanya na kutumia taarifa binafsi kutoka tovuti hii.',
    h1: 'Sera ya faragha',
    updated: 'Imesasishwa mwisho: Septemba 2026',
    sections: [
      ['Sisi ni nani', 'Kazi Electronics Services ni kampuni iliyosajiliwa Tanzania, yenye ofisi Jengo la Matasalamat, Samora Avenue, Dar es Salaam. Sera hii inaeleza tunachofanya na taarifa binafsi unazotutumia kupitia tovuti hii.'],
      ['Tunachokusanya', 'Unapotuma ombi la bei, ombi la ukarabati au ujumbe, tunakusanya jina lako, namba ya simu, barua pepe (ukiitoa), taasisi, mahali ulipo na maelezo unayoandika. Ukijisajili kupokea habari zetu, tunakusanya barua pepe yako.'],
      ['Tunavyoitumia', 'Tunatumia taarifa zako kujibu ombi lako, kuandaa bei, kupanga ukarabati na usimikaji, na kuweka kumbukumbu za kazi. Tunatuma jarida kwa watu waliojisajili tu, na unaweza kujiondoa wakati wowote.'],
      ['Nani anazishughulikia', 'Maombi yanashughulikiwa kupitia Cloudflare, inayoendesha huduma ya fomu, na barua pepe zinatumwa kupitia Brevo. Ukichagua kuendelea WhatsApp, ujumbe wako unashughulikiwa na WhatsApp kwa masharti yake. Hatuuzi taarifa zako.'],
      ['Hifadhi kwenye kifaa chako', 'Tovuti hii huhifadhi lugha uliyochagua na orodha yako ya bei kwenye kivinjari chako ili vikumbukwe. Haitumii vidakuzi vya matangazo.'],
      ['Muda wa kuhifadhi', 'Tunahifadhi kumbukumbu za maombi kwa muda unaohitajika kukuhudumia na kukidhi mahitaji ya kibiashara na ya kisheria ya kutunza kumbukumbu.'],
      ['Haki zako', 'Unaweza kuomba kuona, kusahihisha au kufuta taarifa binafsi tulizonazo kukuhusu, kwa mujibu wa Sheria ya Ulinzi wa Taarifa Binafsi ya mwaka 2022 ya Tanzania. Tuandikie kwa barua pepe iliyo hapa chini.']
    ],
    contactLine: 'Maswali kuhusu faragha: '
  },

  notFound: {
    title: 'Ukurasa haujapatikana | Kazi Electronics Services', h1: 'Ukurasa haujapatikana',
    text: 'Ukurasa unaoutafuta umehamishwa au haupo.', home: 'Nenda ukurasa wa mwanzo', products: 'Angalia bidhaa'
  },

  js: {
    quoteAdded: 'Imeongezwa kwenye orodha yako ya bei', errNetwork: 'Tatizo la mtandao. Tafadhali jaribu tena.',
    itemsWord: 'vitu'
  }
};
