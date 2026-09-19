#!/usr/bin/env node
/* Kazi Electronics Services — static site generator (no dependencies).
   Usage: node scripts/build.js   → writes the finished site to ./dist            */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist');
const cfg = require(path.join(SRC, 'site.config.js'));
const LANGS = { en: require(path.join(SRC, 'i18n/en.js')), sw: require(path.join(SRC, 'i18n/sw.js')) };
const BUILD = Date.now().toString(36);
const KEYS = ['home', 'about', 'products', 'services', 'projects', 'quote', 'contact', 'faq', 'privacy'];

/* ───────────── utilities ───────────── */
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mkdirp = (d) => fs.mkdirSync(d, { recursive: true });
const write = (f, c) => { mkdirp(path.dirname(f)); fs.writeFileSync(f, c); };
const exists = (f) => fs.existsSync(f);
function copyDir(from, to) {
  mkdirp(to);
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name === '.gitkeep' || e.name === 'README.md') continue;
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}
function serialize(v) { // JSON that can also carry (arrow) functions
  if (typeof v === 'function') return v.toString();
  if (Array.isArray(v)) return '[' + v.map(serialize).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).map((k) => JSON.stringify(k) + ':' + serialize(v[k])).join(',') + '}';
  return JSON.stringify(v);
}

/* ───────────── icons (24×24 line icons) ───────────── */
const ICONS = {
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  desktop: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
  printer: '<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="8" rx="1.5"/><path d="M7 14h10v6H7z"/>',
  copier: '<rect x="3" y="10" width="18" height="9" rx="1.5"/><path d="M5 10l2-5h10l2 5M7 15h4"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
  cctv: '<rect x="3" y="7" width="14" height="9" rx="1.5"/><path d="M17 10.5l4-2.5v8l-4-2.5"/>',
  power: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M12.5 8.5L9.5 12h4l-3 3.5"/>',
  aircon: '<rect x="3" y="5" width="18" height="7" rx="1.5"/><path d="M6 15c0 2 1 3 1 5M12 15c0 2 1 3 1 5M18 15c0 2 1 3 1 5"/>',
  supplies: '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M9 9h6M9 13h6M9 17h3"/>',
  box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
  pen: '<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  whatsapp: '<path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'
};
const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const catIcon = { laptops: 'laptop', desktops: 'desktop', printers: 'printer', copiers: 'copier', networking: 'network', security: 'cctv', power: 'power', aircon: 'aircon', supplies: 'supplies' };

/* ───────────── static data ───────────── */
const CLIENTS = [
  ['nhif', 'National Health Insurance Fund (NHIF)'], ['dawasa', 'DAWASA'], ['nssf', 'NSSF'], ['tanroads', 'TANROADS'],
  ['cfao-motors', 'CFAO Motors'], ['icea-lion', 'ICEA Lion Group'], ['nbs', 'National Bureau of Statistics'], ['sga-security', 'SGA Security'],
  ['tz-government', 'Government of Tanzania'], ['acb', 'ACB'], ['sky-sea', 'Sky Sea Limited'], ['client-6', 'Client logo'],
  ['save-the-children', 'Save the Children'], ['cssc', 'Christian Social Services Commission'], ['sukari', 'Sugar Board of Tanzania'], ['efc', 'EFC'],
  ['alosco', 'Alosco Holdings'], ['property-international', 'Property International Ltd'], ['algeria', 'Flag of Algeria'], ['qatar', 'Flag of Qatar'],
  ['mawalla', 'Mawalla Corporate Services'], ['apc', 'APC Hotel & Conference Centre']
];
const BRANDS = ['HP', 'Dell', 'Epson', 'TP-Link', 'D-Link', 'JBL'];
const PH = {
  en: { quote: 'Customer feedback will appear here.', who: 'Customer name, organisation' },
  sw: { quote: 'Maoni ya wateja yataonekana hapa.', who: 'Jina la mteja, taasisi' }
};
let TESTIMONIALS = [];
try { TESTIMONIALS = JSON.parse(fs.readFileSync(path.join(SRC, 'data/testimonials.json'), 'utf8')); } catch (e) { TESTIMONIALS = []; }

/* ───────────── url helpers ───────────── */
const tel = '+' + cfg.whatsapp;
const pagePath = (lang, key) => { const s = LANGS[lang].slugs[key]; return s ? `${lang}/${s}/` : `${lang}/`; };
const depthOf = (lang, key) => (LANGS[lang].slugs[key] ? 2 : 1);
const absUrl = (lang, key) => `${cfg.siteUrl}/${pagePath(lang, key)}`;
const link = (ctx, key, extra = '') => ctx.rel + pagePath(ctx.lang, key) + extra;
const wa = (text) => `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapsQuery)}`;
const other = (lang) => (lang === 'en' ? 'sw' : 'en');

/* ───────────── shared blocks ───────────── */
function slotImage(ctx, dir, name, label) {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (exists(path.join(SRC, 'assets/img', dir, `${name}.${ext}`))) {
      return `<figure class="photo"><img src="${ctx.rel}assets/img/${dir}/${name}.${ext}" alt="${esc(label)}" loading="lazy" decoding="async"><figcaption>${esc(label)}</figcaption></figure>`;
    }
  }
  if (!cfg.showPlaceholders) return '';
  return `<figure class="photo"><div class="ph" role="img" aria-label="${esc(label)}">${icon('image')}<span>${esc(ctx.t.ui.photoSoon)}</span></div><figcaption>${esc(label)}</figcaption></figure>`;
}
function clientsList(ctx, files, compact, withText) {
  const items = files.map((f) => `<li><img src="${ctx.rel}assets/img/clients/${f[0]}.webp" alt="${esc(f[1])}" loading="lazy" decoding="async" width="150" height="80"></li>`);
  if (withText) ctx.t.projects.textClients.forEach((n) => items.push(`<li class="txt">${esc(n)}</li>`));
  return `<ul class="clients${compact ? ' compact' : ''}">${items.join('')}</ul>`;
}
function ctaPanel(ctx, title, text) {
  return `<div class="cta"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div><div class="actions"><a class="btn btn-red" href="${link(ctx, 'quote')}">${esc(ctx.t.ui.quote)}</a><a class="btn btn-ghost" href="${wa(ctx.t.ui.waHello)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(ctx.t.ui.chatWhatsapp)}</a></div></div>`;
}
function steps(ctx) {
  const p = ctx.t.home.process;
  return `<ol class="job">${p.steps.map((s, i) => `<li><span class="n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}</ol>`;
}
function pageHead(h1, lead) { return `<section class="page-head"><div class="wrap"><h1>${esc(h1)}</h1><p>${esc(lead)}</p></div></section>`; }

function formHtml(ctx, kind) {
  const q = ctx.t.quote, f = q.fields, full = kind === 'quote';
  const select = full ? `<div class="field full"><label for="${kind}-type">${esc(f.type)}</label><select class="input" id="${kind}-type" name="type">${q.types.map((x) => `<option value="${x[0]}">${esc(x[1])}</option>`).join('')}</select></div>` : '';
  const extra = full ? `<div class="field"><label for="${kind}-org">${esc(f.org)}</label><input class="input" id="${kind}-org" name="org" autocomplete="organization"></div><div class="field full"><label for="${kind}-place">${esc(f.place)}</label><input class="input" id="${kind}-place" name="place" autocomplete="address-level2"></div>` : '';
  return `<div class="form-wrap"><form class="form" data-kazi-form data-kind="${kind}" novalidate>
<div class="formgrid">${select}
<div class="field"><label for="${kind}-name">${esc(f.name)}</label><input class="input" id="${kind}-name" name="name" autocomplete="name" aria-required="true"></div>
<div class="field"><label for="${kind}-phone">${esc(f.phone)}</label><input class="input" id="${kind}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" aria-required="true"></div>
<div class="field${full ? '' : ' full'}"><label for="${kind}-email">${esc(f.email)}</label><input class="input" id="${kind}-email" name="email" type="email" autocomplete="email"></div>${extra}
<div class="field full"><label for="${kind}-message">${esc(f.message)}</label><textarea class="input" id="${kind}-message" name="message" placeholder="${esc(f.messagePh)}"></textarea></div>
<div class="field"><label for="${kind}-lang">${esc(f.lang)}</label><select class="input" id="${kind}-lang" name="replyLang"><option value="en"${ctx.lang === 'en' ? ' selected' : ''}>${esc(f.langEn)}</option><option value="sw"${ctx.lang === 'sw' ? ' selected' : ''}>${esc(f.langSw)}</option></select></div>
</div>
<div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
<div class="ts-slot" style="margin-top:14px"></div>
<p class="hint">${esc(q.consent)} <a href="${link(ctx, 'privacy')}">${esc(q.privacyLink)}</a>.</p>
<p style="margin:14px 0 0"><button class="btn btn-red" type="submit">${esc(q.send)}</button></p>
<p class="form-status" role="status" aria-live="polite"></p>
</form><div class="ok-panel" hidden></div></div>`;
}

/* ───────────── page bodies ───────────── */
function homeBody(ctx) {
  const t = ctx.t, h = t.home;
  const hero = `<section class="hero"><div class="wrap hero-grid">
<div class="hero-copy"><h1><span>${esc(h.hero.h1.split('. ')[0])}.</span> <span>${esc(h.hero.h1.split('. ')[1])}.</span> <span>${esc(h.hero.h1.split('. ')[2].replace(/\.$/, ''))}.</span></h1>
<p class="lead">${esc(h.hero.lead)}</p>
<div class="hero-cta"><a class="btn btn-red" href="${link(ctx, 'quote')}">${esc(t.ui.quote)}</a><a class="btn btn-ghost" href="${wa(t.ui.waHello)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(t.ui.chatWhatsapp)}</a></div>
<ul class="hero-facts"><li>${icon('pin')}${esc(cfg.addressLine1)}</li><li>${icon('clock')}${esc(t.ui.hours)}</li><li>${icon('check')}${esc(h.hero.since)}</li></ul></div>
<div class="hero-visual"><svg class="arc" viewBox="0 0 532 601" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF5A5F"/><stop offset=".5" stop-color="#E0242B"/><stop offset="1" stop-color="#B5121A"/></linearGradient></defs><path d="M96 36C250-6 480 4 528 310 470 112 300 64 96 36Z" fill="url(#ag)"/><path d="M170 20C300-14 470-4 516 190 440 60 300 30 170 20Z" fill="url(#ag)" opacity=".7"/><path d="M40 410C40 552 170 612 340 588 190 566 96 500 40 410Z" fill="url(#ag)"/><path d="M20 470C40 560 110 600 190 604 110 570 60 530 20 470Z" fill="url(#ag)" opacity=".7"/></svg>
<picture><img src="${ctx.rel}assets/img/shop-800.webp" srcset="${ctx.rel}assets/img/shop-480.webp 480w, ${ctx.rel}assets/img/shop-800.webp 800w" sizes="(max-width:1020px) 360px, 420px" width="800" height="1067" alt="${esc(h.hero.photoAlt)}" fetchpriority="high"></picture></div>
</div></section>`;
  const intents = `<section class="intents" aria-label="${esc(h.intents.title)}"><div class="wrap"><div class="intents-panel">${h.intents.items.map((it) =>
    `<div class="intent">${icon(it.icon)}<h2>${esc(it.title)}</h2><p>${esc(it.text)}</p><a class="link-more" href="${link(ctx, it.page)}${it.type ? '?type=' + it.type : ''}">${esc(it.cta)}</a></div>`).join('')}</div></div></section>`;
  const cats = `<section class="section"><div class="wrap"><div class="section-head"><h2>${esc(h.categories.title)}</h2><p>${esc(h.categories.text)}</p></div>
<ul class="cats">${t.categories.map((c) => `<li><a href="${link(ctx, 'products')}#cat=${c.id}">${icon(catIcon[c.id])}<span><strong>${esc(c.name)}</strong><span class="b">${esc(c.blurb)}</span></span></a></li>`).join('')}</ul></div></section>`;
  const featured = `<section class="section alt" id="featured-section" hidden><div class="wrap"><div class="section-head row"><div><h2>${esc(h.featured.title)}</h2><p>${esc(h.featured.text)}</p></div><a class="link-more" href="${link(ctx, 'products')}">${esc(h.featured.all)}</a></div><div class="pgrid" id="featured-products"></div></div></section>`;
  const process = `<section class="section"><div class="wrap"><div class="section-head"><h2>${esc(h.process.title)}</h2><p>${esc(h.process.text)}</p></div>${steps(ctx)}</div></section>`;
  const business = `<section class="section band"><div class="wrap band-grid"><div><h2>${esc(h.business.title)}</h2><p>${esc(h.business.text)}</p><a class="btn btn-red" href="${link(ctx, 'quote')}?type=contract">${esc(h.business.cta)}</a></div>
<ul class="checks">${h.business.points.map((p) => `<li>${icon('check')}<span>${esc(p)}</span></li>`).join('')}</ul></div></section>`;
  const clients = `<section class="section"><div class="wrap"><div class="section-head row"><div><h2>${esc(h.clients.title)}</h2><p>${esc(h.clients.text)}</p></div><a class="link-more" href="${link(ctx, 'projects')}#clients">${esc(h.clients.all)}</a></div>${clientsList(ctx, CLIENTS.slice(0, 8), true, false)}</div></section>`;
  const print = `<section class="section alt tight"><div class="wrap"><div class="printband"><h2>${esc(h.print.title)}</h2><p>${esc(h.print.text)}</p><a class="btn btn-line" href="${link(ctx, 'quote')}?type=print">${esc(h.print.cta)}</a></div></div></section>`;
  const projImgs = t.projects.projectSlots.slice(0, 3).map((s) => slotImage(ctx, 'projects', s.file, s.label)).join('');
  const projects = projImgs ? `<section class="section"><div class="wrap"><div class="section-head row"><div><h2>${esc(h.projects.title)}</h2><p>${esc(h.projects.text)}</p></div><a class="link-more" href="${link(ctx, 'projects')}">${esc(h.projects.all)}</a></div><div class="photos">${projImgs}</div></div></section>` : '';
  let quotes = '';
  if (TESTIMONIALS.length) {
    quotes = TESTIMONIALS.slice(0, 3).map((x) => `<figure class="quote-card"><blockquote>${esc(x['quote_' + ctx.lang] || x.quote_en)}</blockquote><cite>${esc(x.name)}${x.org ? ', ' + esc(x.org) : ''}</cite></figure>`).join('');
  } else if (cfg.showPlaceholders) {
    quotes = [1, 2, 3].map(() => `<figure class="quote-card is-ph"><blockquote>${esc(PH[ctx.lang].quote)}</blockquote><cite>${esc(PH[ctx.lang].who)}</cite></figure>`).join('');
  }
  const testimonials = quotes ? `<section class="section alt"><div class="wrap"><div class="section-head"><h2>${esc(h.testimonials.title)}</h2></div><div class="quotes">${quotes}</div></div></section>` : '';
  const brands = `<section class="section tight"><div class="wrap"><div class="section-head"><h2>${esc(h.brands.title)}</h2><p>${esc(h.brands.text)}</p></div><ul class="chips">${BRANDS.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div></section>`;
  const cta = `<section class="section tight"><div class="wrap">${ctaPanel(ctx, h.cta.title, h.cta.text)}</div></section>`;
  return hero + intents + cats + featured + process + business + clients + print + projects + testimonials + brands + cta;
}

function aboutBody(ctx) {
  const t = ctx.t, a = t.about;
  const team = a.teamSlots.map((l, i) => slotImage(ctx, 'team', `team-${i + 1}`, l)).join('');
  const shop = a.workshopSlots.map((l, i) => slotImage(ctx, 'workshop', `workshop-${i + 1}`, l)).join('');
  return pageHead(a.h1, a.lead) +
    `<section class="section"><div class="wrap split"><div class="prose">${a.story.map((p) => `<p>${esc(p)}</p>`).join('')}
<h2 style="margin-top:1.2em">${esc(a.whatTitle)}</h2><p>${esc(a.whatText)} <a class="link-more" href="${link(ctx, 'services')}">${esc(a.whatLink)}</a></p></div>
<div><h2 style="font-size:1.7rem">${esc(a.detailsTitle)}</h2><dl class="facts">${a.details.map((d) => `<div><dt>${esc(d[0])}</dt><dd>${esc(d[1])}</dd></div>`).join('')}</dl></div></div></section>` +
    `<section class="section alt"><div class="wrap"><div class="section-head"><h2>${esc(a.commitmentsTitle)}</h2></div><div class="rules">${a.commitments.map((c) => `<div class="rule"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`).join('')}</div></div></section>` +
    (team ? `<section class="section"><div class="wrap"><div class="section-head"><h2>${esc(a.teamTitle)}</h2><p>${esc(a.teamText)}</p></div><div class="photos">${team}</div></div></section>` : '') +
    (shop ? `<section class="section alt"><div class="wrap"><div class="section-head"><h2>${esc(a.workshopTitle)}</h2><p>${esc(a.workshopText)}</p></div><div class="photos">${shop}</div></div></section>` : '') +
    `<section class="section"><div class="wrap split"><div><h2>${esc(a.visitTitle)}</h2>${visitBox(ctx)}</div><div>${ctaPanelSmall(ctx)}</div></div></section>`;
}
function visitBox(ctx) {
  const t = ctx.t;
  return `<div class="visit"><p>${icon('pin')}<span>${esc(cfg.addressLine1)}<br>${esc(cfg.addressLine2)}<br>${esc(cfg.poBox)}</span></p><p>${icon('clock')}<span>${esc(t.ui.hoursLong)}<br>${esc(t.ui.closedNote)}</span></p><p>${icon('phone')}<a href="tel:${tel}">${esc(cfg.phoneMain)}</a></p><p>${icon('mail')}<a href="mailto:${cfg.email}">${esc(cfg.email)}</a></p><p><a class="btn btn-line btn-sm" href="${mapsUrl}" target="_blank" rel="noopener">${icon('pin')}${esc(t.ui.openMaps)}</a></p></div>`;
}
function ctaPanelSmall(ctx, noQuote) {
  const t = ctx.t;
  return `<div class="altbox"><h2>${esc(t.quote.altTitle)}</h2><p>${esc(t.quote.altText)}</p>${noQuote ? `<a class="btn btn-red" href="tel:${tel}">${icon('phone')}${esc(t.ui.callNow)} ${esc(cfg.phoneMain)}</a>` : `<a class="btn btn-red" href="${link(ctx, 'quote')}">${esc(t.ui.quote)}</a>`}<a class="btn btn-line" href="${wa(t.ui.waHello)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(t.ui.chatWhatsapp)}</a></div>`;
}

function productsBody(ctx) {
  const t = ctx.t, p = t.products;
  return pageHead(p.h1, p.lead) + `<section class="section tight"><div class="wrap">
<h2 class="sr">${esc(p.search)}</h2>
<div class="toolbar">
<div class="field"><label for="f-q">${esc(p.search)}</label><input id="f-q" class="input" type="search" placeholder="${esc(p.searchPh)}" autocomplete="off"></div>
<div class="field"><label for="f-brand">${esc(p.brand)}</label><select id="f-brand" class="input"><option value="">${esc(p.allBrands)}</option></select></div>
<div class="field"><label for="f-stock">${esc(p.availability)}</label><select id="f-stock" class="input"><option value="">${esc(p.anyAvailability)}</option><option value="in_stock">${esc(p.onlyInStock)}</option></select></div>
</div>
<div class="chipbar" id="chips" role="group" aria-label="${esc(p.category)}"></div>
<div class="resultbar"><span id="rcount" aria-live="polite"></span><button type="button" class="linkbtn" id="fclear" hidden>${esc(p.clear)}</button></div>
<div class="pgrid" id="pgrid"></div>
<noscript><p class="empty">${esc(p.noscript)}</p></noscript>
<p style="margin-top:22px;color:var(--steel);font-size:.95rem">${esc(p.updatedNote)}</p>
<div class="quotebar" id="quotebar"><span class="qb-text"></span><a class="btn btn-red btn-sm" href="${link(ctx, 'quote')}">${icon('list')}${esc(p.viewQuote)}</a></div>
</div></section>
<dialog id="pdialog" aria-label="${esc(p.details)}"><button type="button" class="dlg-close" aria-label="${esc(t.ui.close)}">${icon('x')}</button><div id="pdialog-body"></div></dialog>`;
}

function servicesBody(ctx) {
  const t = ctx.t, s = t.services;
  const rows = s.items.map((it) => `<article class="svc" id="${it.id}"><div>${icon(it.icon, 'big')}<h2>${esc(it.title)}</h2><p>${esc(it.text)}</p><a class="btn btn-red" href="${link(ctx, 'quote')}?type=${it.type}">${esc(it.cta)}</a></div><ul>${it.list.map((l) => `<li>${icon('check')}<span>${esc(l)}</span></li>`).join('')}</ul></article>`).join('');
  return pageHead(s.h1, s.lead) + `<section class="section"><div class="wrap">${rows}</div></section>` +
    `<section class="section alt"><div class="wrap"><div class="section-head"><h2>${esc(t.home.process.title)}</h2><p>${esc(t.home.process.text)}</p></div>${steps(ctx)}</div></section>` +
    `<section class="section"><div class="wrap"><div class="section-head"><h2>${esc(s.termsTitle)}</h2></div><div class="rules">${s.terms.map((x) => `<div class="rule"><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div>`).join('')}</div></div></section>` +
    `<section class="section tight"><div class="wrap">${ctaPanel(ctx, t.home.cta.title, t.home.cta.text)}</div></section>`;
}

function projectsBody(ctx) {
  const t = ctx.t, p = t.projects;
  const imgs = p.projectSlots.map((s) => slotImage(ctx, 'projects', s.file, s.label)).join('');
  return pageHead(p.h1, p.lead) +
    `<section class="section"><div class="wrap"><div class="section-head"><h2>${esc(p.projectsTitle)}</h2></div>${imgs ? `<div class="photos">${imgs}</div>` : `<p>${esc(p.projectsEmpty)}</p>`}</div></section>` +
    `<section class="section alt" id="clients"><div class="wrap"><div class="section-head"><h2>${esc(p.clientsTitle)}</h2><p>${esc(p.clientsText)}</p></div>${clientsList(ctx, CLIENTS, false, true)}</div></section>` +
    `<section class="section tight"><div class="wrap">${ctaPanel(ctx, p.cta, t.home.cta.text)}</div></section>`;
}

function quoteBody(ctx) {
  const t = ctx.t, q = t.quote;
  return pageHead(q.h1, q.lead) + `<section class="section"><div class="wrap split"><div>${formHtml(ctx, 'quote')}</div><aside class="side"><div class="basket" id="basket" aria-live="polite"><h2>${esc(q.basketTitle)}</h2><p>${esc(q.basketEmpty)}</p><a class="btn btn-line btn-sm" href="${link(ctx, 'products')}">${esc(q.basketBrowse)}</a></div>${ctaPanelSmall(ctx, true)}</aside></div></section>`;
}

function contactBody(ctx) {
  const t = ctx.t, c = t.contact;
  const cards = `<div class="cgrid">
<div>${icon('pin')}<h2>${esc(t.ui.address)}</h2><p>${esc(cfg.addressLine1)}<br>${esc(cfg.addressLine2)}<br>${esc(cfg.poBox)}</p><p><a href="${mapsUrl}" target="_blank" rel="noopener">${esc(t.ui.openMaps)}</a></p></div>
<div>${icon('phone')}<h2>${esc(t.ui.phone)}</h2><p><a href="tel:${tel}">${esc(cfg.phoneMain)}</a>${cfg.phoneSecondary ? `<br><a href="tel:+${cfg.phoneSecondary.replace(/\D/g, '')}">${esc(cfg.phoneSecondary)}</a>` : ''}</p><p><a href="${wa(t.ui.waHello)}" target="_blank" rel="noopener">${esc(t.ui.chatWhatsapp)}</a></p></div>
<div>${icon('mail')}<h2>${esc(t.ui.email)}</h2><p><a href="mailto:${cfg.email}">${esc(cfg.email)}</a></p></div>
<div>${icon('clock')}<h2>${esc(t.ui.openingHours)}</h2><p>${esc(t.ui.hoursLong)}</p><p>${esc(t.ui.closedNote)}</p></div></div>`;
  const faq = t.faq.items.slice(0, 4).map((x) => `<details class="q"><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('');
  return pageHead(c.h1, c.lead) + `<section class="section"><div class="wrap">${cards}<div class="split"><div><h2>${esc(c.formTitle)}</h2>${formHtml(ctx, 'contact')}</div><div><h2>${esc(c.faqTitle)}</h2>${faq}<p style="margin-top:16px"><a class="link-more" href="${link(ctx, 'faq')}">${esc(c.faqLink)}</a></p></div></div></div></section>`;
}

function faqBody(ctx) {
  const f = ctx.t.faq;
  return pageHead(f.h1, f.lead) + `<section class="section"><div class="wrap"><div style="max-width:52rem">${f.items.map((x) => `<details class="q"><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</div></div></section>`;
}

function privacyBody(ctx) {
  const p = ctx.t.privacy;
  return pageHead(p.h1, p.updated) + `<section class="section"><div class="wrap legal prose">${p.sections.map((s) => `<h2>${esc(s[0])}</h2><p>${esc(s[1])}</p>`).join('')}<p>${esc(p.contactLine)}<a href="mailto:${cfg.email}">${esc(cfg.email)}</a></p></div></section>`;
}

/* ───────────── page shell ───────────── */
function header(ctx) {
  const t = ctx.t, o = other(ctx.lang);
  const nav = t.nav.map(([k, label]) => `<a href="${link(ctx, k)}"${ctx.key === k ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('');
  const switchHref = ctx.key ? ctx.rel + pagePath(o, ctx.key) : ctx.rel + o + '/';
  return `<a class="skip" href="#main">${esc(t.ui.skip)}</a>
<aside class="topbar" aria-label="${esc(t.ui.contactUs)}"><div class="wrap"><span>${icon('pin')}${esc(cfg.addressLine1)}</span><span>${icon('clock')}${esc(t.ui.hours)}</span><a href="tel:${tel}">${icon('phone')}${esc(cfg.phoneMain)}</a><a href="mailto:${cfg.email}">${icon('mail')}${esc(cfg.email)}</a></div></aside>
<header class="site-header"><div class="wrap bar">
<a class="brand" href="${ctx.rel}${ctx.lang}/"><img src="${ctx.rel}assets/img/brand/logo-300.webp" width="300" height="192" alt="${esc(cfg.legalName)}"></a>
<nav class="nav" id="nav" aria-label="${esc(t.ui.nav)}">${nav}</nav>
<div class="bar-actions"><a class="lang" data-lang-switch href="${switchHref}" hreflang="${o}" lang="${o}" aria-label="${esc(t.langSwitch.aria)}">${t.langSwitch.short}</a>
<a class="btn btn-red btn-sm btn-quote" href="${link(ctx, 'quote')}">${esc(t.ui.quote)} <span class="badge" data-quote-count hidden>0</span></a>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">${icon('menu')}<span>${esc(t.ui.menu)}</span></button></div></div></header>`;
}
function footer(ctx) {
  const t = ctx.t;
  const links = [...t.nav.map(([k, l]) => [k, l]), ['faq', t.ui.faqShort]];
  return `<footer class="site-footer"><div class="wrap"><div class="fgrid">
<div><a class="brand" href="${ctx.rel}${ctx.lang}/"><img src="${ctx.rel}assets/img/brand/logo-300.webp" width="300" height="192" alt="${esc(cfg.legalName)}" loading="lazy"></a><p>${esc(t.ui.footerAbout)}</p></div>
<div><h2>${esc(t.ui.quickLinks)}</h2><ul>${links.map(([k, l]) => `<li><a href="${link(ctx, k)}">${esc(l)}</a></li>`).join('')}<li><a href="${link(ctx, 'quote')}">${esc(t.ui.quote)}</a></li></ul></div>
<div><h2>${esc(t.ui.contactUs)}</h2><ul class="flist"><li>${icon('pin')}<span>${esc(cfg.addressLine1)}<br>${esc(cfg.addressLine2)}</span></li><li>${icon('phone')}<span><a href="tel:${tel}">${esc(cfg.phoneMain)}</a>${cfg.phoneSecondary ? `<br><a href="tel:+${cfg.phoneSecondary.replace(/\D/g, '')}">${esc(cfg.phoneSecondary)}</a>` : ''}</span></li><li>${icon('mail')}<a href="mailto:${cfg.email}">${esc(cfg.email)}</a></li><li>${icon('clock')}<span>${esc(t.ui.hours)}</span></li></ul></div>
<div data-subscribe><h2>${esc(t.ui.subscribeTitle)}</h2><p style="margin-top:0">${esc(t.ui.subscribeText)}</p><form class="sub" novalidate><label class="sr" for="sub-email">${esc(t.ui.subscribeLabel)}</label><input class="input" id="sub-email" name="email" type="email" placeholder="${esc(t.ui.subscribeLabel)}" autocomplete="email"><div class="hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div><button class="btn btn-red btn-sm" type="submit">${esc(t.ui.subscribeBtn)}</button></form><p class="sub-msg" role="status" aria-live="polite" style="font-weight:600"></p></div>
</div><div class="fbottom"><span>&copy; ${new Date().getFullYear()} ${esc(cfg.legalName)}. ${esc(t.ui.rights)} ${esc(t.ui.regNo)} ${esc(cfg.regNo)}.</span><a href="${link(ctx, 'privacy')}">${esc(t.ui.privacy)}</a></div></div></footer>
<aside aria-label="WhatsApp"><a class="wa-float" href="${wa(t.ui.waHello)}" target="_blank" rel="noopener" aria-label="${esc(t.ui.chatWhatsapp)}">${icon('whatsapp')}</a></aside>
<nav class="mobilebar" aria-label="${esc(t.ui.call)}"><a href="tel:${tel}">${icon('phone')}${esc(t.ui.call)}</a><a href="${wa(t.ui.waHello)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(t.ui.whatsapp)}</a><a class="q" href="${link(ctx, 'quote')}">${icon('list')}${esc(t.ui.quoteShort)}<span class="badge" data-quote-count hidden>0</span></a></nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}
function shell(ctx, o) {
  const t = ctx.t, canon = o.canonical;
  const alts = o.alts ? Object.keys(o.alts).map((l) => `<link rel="alternate" hreflang="${l}" href="${o.alts[l]}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${o.alts.en}">` : '';
  const og = `${cfg.siteUrl}/assets/img/brand/og-image.jpg`;
  return `<!doctype html>
<html lang="${ctx.lang}" data-base="${ctx.rel}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.description)}">
${o.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canon}">`}${alts}
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(cfg.legalName)}"><meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.description)}"><meta property="og:url" content="${canon}"><meta property="og:image" content="${og}"><meta property="og:locale" content="${t.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A1730">
<link rel="icon" href="${ctx.rel}assets/img/brand/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="${ctx.rel}assets/img/brand/favicon-32.png"><link rel="apple-touch-icon" href="${ctx.rel}assets/img/brand/favicon-180.png">
<link rel="preload" href="${ctx.rel}assets/fonts/barlow-condensed-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.rel}assets/fonts/source-sans-3-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.rel}assets/css/site.css?v=${BUILD}">
${o.jsonld ? `<script type="application/ld+json">${JSON.stringify(o.jsonld)}</script>` : ''}
</head>
<body>
${header(ctx)}
<main id="main">${o.body}</main>
${footer(ctx)}
<script src="${ctx.rel}assets/js/config.js?v=${BUILD}" defer></script>
<script src="${ctx.rel}assets/js/i18n-${ctx.lang}.js?v=${BUILD}" defer></script>
<script src="${ctx.rel}assets/js/app.js?v=${BUILD}" defer></script>
</body></html>`;
}

/* ───────────── build ───────────── */
const BODIES = { home: homeBody, about: aboutBody, products: productsBody, services: servicesBody, projects: projectsBody, quote: quoteBody, contact: contactBody, faq: faqBody, privacy: privacyBody };
const sitemap = [];

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  mkdirp(OUT);
  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
  copyDir(path.join(SRC, 'data'), path.join(OUT, 'data'));
  fs.rmSync(path.join(OUT, 'data/products-template.csv'), { force: true });
  fs.copyFileSync(path.join(SRC, 'assets/img/brand/favicon.ico'), path.join(OUT, 'favicon.ico'));

  // runtime config + per-language strings
  write(path.join(OUT, 'assets/js/config.js'), `window.KAZI=${JSON.stringify({ build: BUILD, whatsapp: cfg.whatsapp, formEndpoint: cfg.formEndpoint, turnstileSiteKey: cfg.turnstileSiteKey, productsSheetCsv: cfg.productsSheetCsv })};`);
  for (const lang of Object.keys(LANGS)) {
    const t = LANGS[lang];
    write(path.join(OUT, `assets/js/i18n-${lang}.js`), 'window.KAZI_I18N=' + serialize({ lang, slugs: t.slugs, ui: t.ui, stock: t.stock, categories: t.categories.map((c) => ({ id: c.id, name: c.name })), products: t.products, quote: t.quote, js: t.js, icons: ICONS }) + ';');
  }

  for (const lang of Object.keys(LANGS)) {
    const t = LANGS[lang];
    for (const key of KEYS) {
      const depth = depthOf(lang, key);
      const ctx = { lang, t, key, depth, rel: '../'.repeat(depth) };
      const meta = t[key];
      const alts = { en: absUrl('en', key), sw: absUrl('sw', key) };
      let jsonld;
      if (key === 'home') {
        jsonld = { '@context': 'https://schema.org', '@type': 'ComputerStore', name: cfg.legalName, url: cfg.siteUrl + '/', image: `${cfg.siteUrl}/assets/img/brand/og-image.jpg`, logo: `${cfg.siteUrl}/assets/img/brand/favicon-192.png`, telephone: cfg.phoneSecondary ? [tel, '+' + cfg.phoneSecondary.replace(/\D/g, '')] : tel, email: cfg.email, foundingDate: `${cfg.founded}-04`, areaServed: 'Tanzania', priceRange: 'TZS',
          address: { '@type': 'PostalAddress', streetAddress: cfg.addressLine1, addressLocality: 'Dar es Salaam', addressCountry: 'TZ' },
          openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: cfg.hoursOpen, closes: cfg.hoursClose }] };
      }
      if (key === 'faq') {
        jsonld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.items.map((x) => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } })) };
      }
      const html = shell(ctx, { title: meta.title, description: meta.description, body: BODIES[key](ctx), canonical: alts[lang], alts, jsonld });
      write(path.join(OUT, pagePath(lang, key), 'index.html'), html);
      if (lang === 'en') sitemap.push({ key, alts });
    }
  }

  // 404 (absolute asset paths, since it can be served from any depth)
  {
    const en = LANGS.en, sw = LANGS.sw, ctx = { lang: 'en', t: en, key: null, depth: 0, rel: '/' };
    const body = `<section class="section"><div class="wrap" style="max-width:40rem"><h1>${esc(en.notFound.h1)}</h1><p>${esc(en.notFound.text)}</p><p><a class="btn btn-red" href="/en/">${esc(en.notFound.home)}</a> <a class="btn btn-line" href="/en/products/">${esc(en.notFound.products)}</a></p><hr style="border:0;border-top:1px solid var(--line);margin:28px 0"><h2 style="font-size:1.8rem">${esc(sw.notFound.h1)}</h2><p>${esc(sw.notFound.text)}</p><p><a class="btn btn-line" href="/sw/">${esc(sw.notFound.home)}</a></p></div></section>`;
    write(path.join(OUT, '404.html'), shell(ctx, { title: en.notFound.title, description: en.notFound.text, body, noindex: true, canonical: cfg.siteUrl + '/' }));
  }

  // root: language redirect
  write(path.join(OUT, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(cfg.legalName)}</title>
<link rel="canonical" href="${cfg.siteUrl}/en/"><link rel="alternate" hreflang="en" href="${cfg.siteUrl}/en/"><link rel="alternate" hreflang="sw" href="${cfg.siteUrl}/sw/"><link rel="alternate" hreflang="x-default" href="${cfg.siteUrl}/en/">
<noscript><meta http-equiv="refresh" content="0;url=en/"></noscript>
<script>(function(){var l=null;try{l=localStorage.getItem('kazi_lang')}catch(e){}if(l!=='sw'&&l!=='en'){l=((navigator.language||'en').toLowerCase().indexOf('sw')===0)?'sw':'en'}location.replace(l+'/'+location.search+location.hash)})();</script>
<style>body{font-family:system-ui,sans-serif;background:#0A1730;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#fff;font-size:1.2rem;margin:0 12px}</style></head>
<body><p><a href="en/">English</a> <a href="sw/">Kiswahili</a></p></body></html>`);

  // sitemap, robots, CNAME
  const urls = sitemap.flatMap((p) => ['en', 'sw'].map((l) => `<url><loc>${p.alts[l]}</loc><xhtml:link rel="alternate" hreflang="en" href="${p.alts.en}"/><xhtml:link rel="alternate" hreflang="sw" href="${p.alts.sw}"/><xhtml:link rel="alternate" hreflang="x-default" href="${p.alts.en}"/></url>`)).join('\n');
  write(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
  write(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);
  write(path.join(OUT, 'CNAME'), new URL(cfg.siteUrl).host + '\n');
  write(path.join(OUT, '.nojekyll'), '');

  console.log(`Built ${sitemap.length * 2} pages + 404 → ${path.relative(process.cwd(), OUT) || OUT}`);
}
build();
