// English content. The Swahili twin is sw.js — keep the two files in the same shape.
module.exports = {
  lang: 'en',
  ogLocale: 'en_US',
  langSwitch: { label: 'Kiswahili', short: 'SW', aria: 'Badili lugha kuwa Kiswahili' },

  slugs: {
    home: '', about: 'about', products: 'products', services: 'services', projects: 'projects',
    quote: 'request-quote', contact: 'contact', faq: 'faq', privacy: 'privacy'
  },

  ui: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', nav: 'Main navigation',
    call: 'Call', whatsapp: 'WhatsApp', chatWhatsapp: 'Chat on WhatsApp', callNow: 'Call now',
    quote: 'Request a quote', quoteShort: 'Quote', seeAll: 'See all',
    hours: 'Mon–Fri, 8:00–17:00', hoursLong: 'Monday to Friday, 8:00 to 17:00',
    closedNote: 'Closed on Saturday, Sunday and public holidays.',
    findUs: 'Find us', openMaps: 'Open in Google Maps', address: 'Address', phone: 'Phone', email: 'Email',
    openingHours: 'Opening hours', photoSoon: 'Photo coming soon', placeholderNote: 'Placeholder',
    footerAbout: 'Computers, printers, networks and office machines: supplied, installed and repaired in Dar es Salaam since 2008.',
    quickLinks: 'Quick links', contactUs: 'Contact', legal: 'Legal', privacy: 'Privacy policy',
    rights: 'All rights reserved.', regNo: 'Certificate of Incorporation No.',
    subscribeTitle: 'Get offers and news', subscribeText: 'Occasional emails about new stock and offers.',
    subscribeLabel: 'Your email address', subscribeBtn: 'Subscribe',
    subscribeOk: 'Thank you. You are on the list.', subscribeErr: 'We could not subscribe you. Please try again later.',
    waHello: 'Hello Kazi Electronics, I have a question.',
    waQuote: 'Hello Kazi Electronics, I would like a quote.',
    langAria: 'Language', faqShort: 'FAQs'
  },

  nav: [
    ['home', 'Home'], ['products', 'Products'], ['services', 'Services'], ['projects', 'Projects & clients'],
    ['about', 'About us'], ['contact', 'Contact']
  ],

  categories: [
    { id: 'laptops',    name: 'Laptops & tablets',              blurb: 'For the office, school and home' },
    { id: 'desktops',   name: 'Desktop computers',              blurb: 'Branded and custom-built PCs' },
    { id: 'printers',   name: 'Printers & scanners',            blurb: 'Laser, inkjet, ink tank, dot-matrix' },
    { id: 'copiers',    name: 'Photocopiers & office machines', blurb: 'Copiers, bill counters, plotters' },
    { id: 'networking', name: 'Networking',                     blurb: 'Routers, Wi-Fi, switches, cabling' },
    { id: 'security',   name: 'CCTV & attendance',              blurb: 'Cameras and fingerprint terminals' },
    { id: 'power',      name: 'Power backup',                   blurb: 'UPS units for computers and offices' },
    { id: 'aircon',     name: 'Air conditioners',               blurb: 'Split units, supplied and serviced' },
    { id: 'supplies',   name: 'Accessories & supplies',         blurb: 'Ink, toner, paper, memory, peripherals' }
  ],

  stock: { in_stock: 'In stock', low: 'Low stock', out: 'Out of stock', order: 'On order', ask: 'Call to confirm stock' },

  home: {
    title: 'Kazi Electronics Services | Computers, Printers, Networks & Repairs in Dar es Salaam',
    description: 'Buy laptops, printers, networking and CCTV, or get computers and office machines repaired. Kazi Electronics Services, Samora Avenue, Dar es Salaam.',
    hero: {
      h1: 'We supply. We install. We service.',
      lead: 'Laptops, printers, photocopiers, networks and CCTV for homes, offices and institutions. Bought, set up and repaired in one place on Samora Avenue, Dar es Salaam.',
      photoAlt: 'Inside the Kazi Electronics Services shop, with laptops, printers and networking equipment on display',
      since: 'Serving Dar es Salaam since 2008'
    },
    intents: {
      title: 'What do you need today?',
      items: [
        { icon: 'cart', title: 'Buy equipment', text: 'Laptops, desktops, printers, copiers, networking and more. Tell us what you need and we send a written quote.', cta: 'Browse products', page: 'products' },
        { icon: 'wrench', title: 'Get something repaired', text: 'Computers, printers, photocopiers, bill counters and air conditioners. On-site when possible, in our workshop when needed.', cta: 'Request a repair', page: 'quote', type: 'repair' },
        { icon: 'network', title: 'Set up your office', text: 'Local area networks, Wi-Fi, CCTV, attendance terminals and power backup, installed and tested.', cta: 'Ask about installation', page: 'quote', type: 'installation' }
      ]
    },
    categories: { title: 'What we supply', text: 'Choose a category to see what is on our shelves.' },
    featured: { title: 'Featured products', text: 'Ask for today’s price and stock. We confirm both in writing.', all: 'See all products' },
    process: {
      title: 'How a repair works',
      text: 'The same five steps for a home laptop or an office photocopier.',
      steps: [
        { title: 'Tell us what is wrong', text: 'Call, message us on WhatsApp, send the form, or bring the equipment to the shop.' },
        { title: 'We diagnose', text: 'A technician checks the equipment at your site. If it cannot be fixed there, we take it to our workshop.' },
        { title: 'You approve the cost', text: 'Labour and any spare parts are agreed with you before we replace anything.' },
        { title: 'We repair and test', text: 'Cleaning, part replacement, software and virus clean-up. Then we test everything.' },
        { title: 'Job card and invoice', text: 'You sign the job card to confirm the work is done, and we issue the invoice.' }
      ]
    },
    business: {
      title: 'Maintenance contracts for offices and institutions',
      text: 'Keep computers, printers and copiers running with scheduled visits instead of emergency call-outs.',
      points: [
        'Preventive maintenance every quarter, or as often as your office needs',
        'Prompt on-call and on-site support',
        'First-priority attention for contract customers',
        'Careful handling of your data, especially on hard drives'
      ],
      cta: 'Ask about a contract'
    },
    clients: { title: 'Trusted by organisations across Tanzania', text: 'A selection of the clients we supply and support.', all: 'See all our clients' },
    print: {
      title: 'We design. We print.',
      text: 'Logos, brochures, business cards, invoice and receipt books, banners, calendars, letterheads, T-shirts and branding.',
      cta: 'Ask for a print quote'
    },
    projects: { title: 'Recent work', text: 'Network, CCTV and office installations.', all: 'See all projects' },
    testimonials: { title: 'What customers say' },
    brands: { title: 'Brands we supply', text: 'Sourced through local dealers of these brands. Need another brand? Ask us.' },
    cta: { title: 'Not sure what you need?', text: 'Tell us the problem or your budget. We reply during working hours.' }
  },

  about: {
    title: 'About Us | Kazi Electronics Services',
    description: 'A Dar es Salaam company supplying, installing and repairing computers, printers, copiers and networks since 2008.',
    h1: 'About Kazi Electronics Services',
    lead: 'We supply computers and office machines, and we look after them afterwards.',
    story: [
      'Kazi Electronics Services is a private company registered in Tanzania in April 2008 (Certificate of Incorporation No. 179861). We are based in Dar es Salaam and work mainly on computers, office machines and the networks that connect them.',
      'Many companies sell computers, photocopiers and printers but offer no repair or maintenance once the sale is done. We fill that gap. We service, upgrade and repair computer hardware, peripherals and office machines, and we supply the equipment too.'
    ],
    commitmentsTitle: 'How we work',
    commitments: [
      { title: 'Experienced technicians', text: 'Full-time technicians across each specialty, with part-time experts brought in when a job needs them.' },
      { title: 'Care with your data', text: 'Our technicians handle any data they come across while servicing equipment, especially hard drives, with the utmost care.' },
      { title: 'Across Tanzania', text: 'We work in Dar es Salaam and can visit other towns in Tanzania by arrangement.' },
      { title: 'On-site first', text: 'Most repairs are done at your premises. When a machine needs deeper work, we take it to our workshop.' }
    ],
    whatTitle: 'What we do',
    whatText: 'Sales, installation, repair and maintenance of computers and office equipment, plus graphic design and printing.',
    whatLink: 'See all services',
    teamTitle: 'Our team',
    teamText: 'Software engineers, hardware technicians, printer and photocopier engineers, and customer-facing staff.',
    teamSlots: ['Technicians at work', 'Software and network engineers', 'Sales and customer care'],
    workshopTitle: 'Our workshop',
    workshopText: 'Tools for hardware repair, network installation and troubleshooting.',
    workshopSlots: ['Repair bench', 'Testing and diagnostics'],
    detailsTitle: 'Company details',
    details: [['Legal name', 'Kazi Electronics Services'], ['Registered', 'April 2008, Tanzania'], ['Certificate of Incorporation', 'No. 179861'], ['Postal address', 'P.O. Box 13700, Dar es Salaam']],
    visitTitle: 'Visit us'
  },

  products: {
    title: 'Products | Kazi Electronics Services',
    description: 'Laptops, desktops, printers, photocopiers, networking, CCTV, UPS and air conditioners. Ask for a quote from Kazi Electronics Services in Dar es Salaam.',
    h1: 'Products',
    lead: 'Prices are a guide. Add what you need to your quote list and we confirm price and stock in writing.',
    search: 'Search products', searchPh: 'Search by name or brand',
    category: 'Category', allCategories: 'All categories',
    brand: 'Brand', allBrands: 'All brands',
    availability: 'Availability', anyAvailability: 'Any availability', onlyInStock: 'In stock only',
    results: (n) => n === 1 ? '1 product' : n + ' products',
    clear: 'Clear filters',
    contactPrice: 'Contact for price', from: 'TZS',
    add: 'Add to quote', added: 'Added', inQuote: 'In your quote',
    askWa: 'Ask on WhatsApp', details: 'Details', specs: 'Specifications',
    empty: 'No products match your search. Clear the filters, or ask us. We can often source what is not listed.',
    loadErr: 'We could not load the product list. Please call us or message us on WhatsApp.',
    loading: 'Loading products',
    noscript: 'Please turn on JavaScript to browse the product list, or call us on +255 715 267 903.',
    quoteBar: (n) => n === 1 ? '1 item in your quote' : n + ' items in your quote',
    viewQuote: 'View quote list',
    waProduct: (name) => 'Hello Kazi Electronics, I am interested in: ' + name + '. Please send me the price and availability.',
    updatedNote: 'Our sales team updates this list regularly. Stock can change during the day.'
  },

  services: {
    title: 'Services | Kazi Electronics Services',
    description: 'Sales, installation, repair and maintenance of computers, printers, copiers, networks and CCTV, plus graphic design and printing in Dar es Salaam.',
    h1: 'Services',
    lead: 'Supply, installation, repair and maintenance for computers and office machines, plus design and printing.',
    items: [
      { id: 'sales', icon: 'cart', title: 'Sales', text: 'New computers, printers, photocopiers, networking equipment and consumables for individuals, businesses and institutions. Bulk and corporate orders are welcome.', list: ['Computers, laptops and tablets', 'Printers, scanners and copiers', 'Networking equipment and accessories', 'Stationery and consumables', 'UPS and power backup'], cta: 'Request a quote', type: 'products' },
      { id: 'installation', icon: 'network', title: 'Installation', text: 'We plan, install and test the systems your office runs on, then hand over a working set-up.', list: ['Local area networks (LAN)', 'Wide area networks (WAN)', 'CCTV cameras', 'Fingerprint attendance terminals', 'Complete computer builds and software installation'], cta: 'Ask about installation', type: 'installation' },
      { id: 'repair', icon: 'wrench', title: 'Repair and upgrades', text: 'Systematic diagnosis and repair of computers, printers, photocopiers and other office machines, at your premises or in our workshop.', list: ['Virus and spyware removal', 'Operating system clean-ups and fresh installs', 'Hardware and memory upgrades', 'Data recovery and hardware diagnostics', 'Battery replacement', 'Photocopiers, printers, fax machines, bill counters, plotters, laminators', 'Air conditioner servicing', 'Telephone maintenance'], cta: 'Request a repair', type: 'repair' },
      { id: 'contracts', icon: 'shield', title: 'Maintenance contracts', text: 'Scheduled support for offices that cannot afford downtime. Contract customers get first-priority attention.', list: ['Preventive maintenance every quarter, or as your office requires', 'Physical cleaning, dust removal, software updates and virus removal', 'Prompt on-call and on-site support', 'Repairs and upgrades on request'], cta: 'Ask about a contract', type: 'contract' },
      { id: 'consulting', icon: 'cap', title: 'IT consultancy and training', text: 'We assess what your office needs before you buy, and we train your staff on site.', list: ['Needs assessment and IT consultancy', 'In-house training for your team'], cta: 'Ask about consultancy', type: 'other' },
      { id: 'print', icon: 'pen', title: 'Design and printing', text: 'Communication and marketing materials designed and printed for your business.', list: ['Logo design and branding', 'Brochures, business cards and letterheads', 'Invoice, proforma and receipt books', 'Banners, large-format and digital printing', 'Calendars, T-shirts, embroidery and screen printing'], cta: 'Ask for a print quote', type: 'print' }
    ],
    termsTitle: 'Good to know',
    terms: [
      ['Where we work', 'At your premises in Dar es Salaam and other towns in Tanzania. If a fault cannot be fixed on site, we take the machine to our workshop.'],
      ['Support hours', 'Monday to Friday, 8:00 to 17:00, excluding public holidays and weekends.'],
      ['Spare parts', 'Cost and availability of spare parts are agreed with you before we fit them.'],
      ['Payment for contract work', 'We invoice after each completed routine service, with a job card signed by your authorised user.']
    ]
  },

  projects: {
    title: 'Projects & Clients | Kazi Electronics Services',
    description: 'Network, CCTV and office installations by Kazi Electronics Services, and a selection of the organisations we supply and support.',
    h1: 'Projects and clients',
    lead: 'Installations we have completed, and some of the organisations that rely on us.',
    projectsTitle: 'Installations',
    projectSlots: [
      { file: 'lan-1', label: 'LAN installation' }, { file: 'lan-2', label: 'Office network and Wi-Fi' },
      { file: 'cctv-1', label: 'CCTV installation' }, { file: 'cctv-2', label: 'CCTV control room' }
    ],
    projectsEmpty: 'Project photos are coming soon. Ask us about a similar job.',
    clientsTitle: 'Our clients',
    clientsText: 'We have a large number of individual, institutional and corporate clients. These are a small cross-section of recent ones.',
    textClients: ['Ministry of Health', 'The Solicitor General'],
    cta: 'Planning something similar?'
  },

  quote: {
    title: 'Request a Quote | Kazi Electronics Services',
    description: 'Ask Kazi Electronics Services for a quote on equipment, repairs, installation or maintenance. We reply during working hours.',
    h1: 'Request a quote',
    lead: 'Tell us what you need. We reply during working hours, Monday to Friday, 8:00 to 17:00.',
    types: [
      ['products', 'Buy equipment'], ['repair', 'Repair or service'], ['installation', 'Installation (LAN, CCTV, power)'],
      ['contract', 'Maintenance contract'], ['print', 'Design and printing'], ['other', 'Something else']
    ],
    fields: {
      type: 'What do you need?', name: 'Your name', phone: 'Phone (WhatsApp if possible)', email: 'Email (optional)',
      org: 'Company or organisation (optional)', place: 'Where are you? (area in Dar es Salaam or town)',
      message: 'Tell us more', messagePh: 'Equipment, quantity, the fault you see, your budget, or when you need it.',
      lang: 'Reply in', langEn: 'English', langSw: 'Kiswahili'
    },
    consent: 'By sending this form you agree that we may contact you about your request.',
    privacyLink: 'Privacy policy',
    send: 'Send request', sending: 'Sending',
    basketTitle: 'Your quote list', basketEmpty: 'No products added yet.', basketBrowse: 'Browse products',
    qty: 'Quantity', remove: 'Remove',
    errRequired: 'Please enter your name and a phone number or email address.',
    errSend: 'We could not send your request. Please try again, or send it on WhatsApp.',
    okTitle: 'Request received',
    okText: (name, ref) => 'Thank you' + (name ? ', ' + name : '') + '. Your reference is ' + ref + '. We will reply during working hours.',
    okWa: 'Continue on WhatsApp',
    fallbackNote: 'Your request will open in WhatsApp so you can send it to us directly.',
    waIntro: 'Hello Kazi Electronics, I would like a quote.',
    waLabels: { type: 'Request', name: 'Name', phone: 'Phone', email: 'Email', org: 'Organisation', place: 'Location', message: 'Details', items: 'Products' },
    altTitle: 'Prefer to talk?', altText: 'Message or call us during working hours.'
  },

  contact: {
    title: 'Contact | Kazi Electronics Services',
    description: 'Visit Kazi Electronics Services at Matasalamat Building on Samora Avenue, Dar es Salaam, or call, message us on WhatsApp or email.',
    h1: 'Contact us',
    lead: 'Visit the shop, call, or send a message. We reply during working hours.',
    formTitle: 'Send us a message',
    faqTitle: 'Quick answers', faqLink: 'Read all questions'
  },

  faq: {
    title: 'FAQs | Kazi Electronics Services',
    description: 'Answers about opening hours, repairs, quotes, coverage, maintenance contracts and payment at Kazi Electronics Services.',
    h1: 'Frequently asked questions',
    lead: 'Can’t find your answer? Message us on WhatsApp.',
    items: [
      ['What are your opening hours?', 'We are open Monday to Friday, 8:00 to 17:00. We are closed on Saturday, Sunday and public holidays.'],
      ['Where are you located?', 'Matasalamat Building, along Samora Avenue, in Dar es Salaam city centre.'],
      ['How do I get a price?', 'Add products to your quote list, or tell us what you need on the quote form or on WhatsApp. We reply with a written quote during working hours. Prices on the website are a guide.'],
      ['Do you repair at my office or in your workshop?', 'On-site whenever possible. If a machine needs deeper diagnosis or specialised repair, we take it to our workshop.'],
      ['Which areas do you cover?', 'Dar es Salaam and other towns in Tanzania by arrangement.'],
      ['Do you offer maintenance contracts?', 'Yes. Contract customers get preventive maintenance every quarter (or as your office requires), on-call and on-site support, and first-priority attention.'],
      ['Who pays for spare parts?', 'The cost and availability of spare parts are agreed with you before they are fitted.'],
      ['How does payment work?', 'For contract work we invoice after each completed routine service, with a job card signed by your authorised user. For purchases, we confirm payment details in your quote.'],
      ['Is my data safe when you repair my computer?', 'Our technicians treat any data they come across, especially on hard drives, with the utmost care. Back up important files before a repair when you can.'],
      ['Does the equipment come with a warranty?', 'Warranty depends on the product and the supplier. We state the warranty in your quote.'],
      ['Do you supply businesses and institutions?', 'Yes. We supply and support individuals, companies and public institutions, including bulk orders.']
    ]
  },

  privacy: {
    title: 'Privacy Policy | Kazi Electronics Services',
    description: 'How Kazi Electronics Services collects and uses personal information from this website.',
    h1: 'Privacy policy',
    updated: 'Last updated: September 2026',
    sections: [
      ['Who we are', 'Kazi Electronics Services is a company registered in Tanzania, based at Matasalamat Building, Samora Avenue, Dar es Salaam. This policy explains what we do with personal information you send us through this website.'],
      ['What we collect', 'When you send a quote request, repair request or message, we collect your name, phone number, email address (if given), organisation, location and the details you write. If you subscribe to our newsletter, we collect your email address.'],
      ['How we use it', 'We use your details to reply to your request, prepare quotes, arrange repairs and installations, and keep a record of the work. We send newsletters only to people who subscribe, and you can unsubscribe at any time.'],
      ['Who handles it', 'Requests are processed through Cloudflare, which runs the form service, and emails are delivered through Brevo. If you choose to continue on WhatsApp, your messages are handled by WhatsApp under its own terms. We do not sell your information.'],
      ['Storage on your device', 'This website stores your language choice and your quote list in your browser so they are remembered. It does not use advertising cookies.'],
      ['How long we keep it', 'We keep request records for as long as needed to serve you and to meet business and legal record-keeping needs.'],
      ['Your rights', 'You can ask us to see, correct or delete the personal information we hold about you, in line with the Personal Data Protection Act, 2022 of Tanzania. Write to us at the email address below.']
    ],
    contactLine: 'Questions about privacy: '
  },

  notFound: {
    title: 'Page not found | Kazi Electronics Services', h1: 'Page not found',
    text: 'The page you are looking for has moved or does not exist.', home: 'Go to the home page', products: 'Browse products'
  },

  // Sent to the browser for the interactive parts
  js: {
    quoteAdded: 'Added to your quote list', errNetwork: 'Network problem. Please try again.',
    itemsWord: 'items'
  }
};
