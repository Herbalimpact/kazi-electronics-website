/* Kazi Electronics Services — front-end behaviour (no dependencies) */
(function () {
  'use strict';
  var K = window.KAZI || {}, T = window.KAZI_I18N || {}, root = document.documentElement;
  var base = root.getAttribute('data-base') || '';
  var lang = root.lang === 'sw' ? 'sw' : 'en';
  var P = T.products || {}, Q = T.quote || {}, ICONS = T.icons || {};

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function icon(name, cls) { return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>'; }
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function waLink(text) { return 'https://wa.me/' + (K.whatsapp || '') + '?text=' + encodeURIComponent(text); }
  function pageHref(key) { return base + lang + '/' + ((T.slugs && T.slugs[key]) ? T.slugs[key] + '/' : ''); }

  var toastEl = $('#toast'), toastTimer;
  function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2400); }

  /* ---------- Language memory ---------- */
  $$('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('kazi_lang', a.getAttribute('hreflang')); } catch (e) {} });
  });
  try { localStorage.setItem('kazi_lang', lang); } catch (e) {}

  /* ---------- Mobile menu ---------- */
  var mb = $('.menu-btn'), nav = $('#nav');
  if (mb && nav) {
    mb.addEventListener('click', function () { var open = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
  }

  /* ---------- Quote basket ---------- */
  var basket = lsGet('kazi_quote', []);
  function saveBasket() { lsSet('kazi_quote', basket); renderBadges(); renderBasket(); }
  function renderBadges() {
    $$('[data-quote-count]').forEach(function (el) { el.textContent = basket.length; el.hidden = !basket.length; });
    var bar = $('#quotebar');
    if (bar) { bar.classList.toggle('on', basket.length > 0); var t = $('.qb-text', bar); if (t) t.textContent = P.quoteBar ? P.quoteBar(basket.length) : basket.length; }
  }
  function basketName(i) { return (i.n && (i.n[lang] || i.n.en)) || i.id; }
  function addToBasket(p) {
    var f = basket.filter(function (i) { return i.id === p.id; })[0];
    if (f) f.qty++; else basket.push({ id: p.id, n: { en: p.name_en, sw: p.name_sw || p.name_en }, qty: 1 });
    saveBasket(); toast((T.js && T.js.quoteAdded) || 'Added');
  }
  function renderBasket() {
    var box = $('#basket'); if (!box) return;
    if (!basket.length) {
      box.innerHTML = '<h2>' + esc(Q.basketTitle) + '</h2><p>' + esc(Q.basketEmpty) + '</p><a class="btn btn-line btn-sm" href="' + pageHref('products') + '">' + esc(Q.basketBrowse) + '</a>';
      return;
    }
    box.innerHTML = '<h2>' + esc(Q.basketTitle) + '</h2>' + basket.map(function (i, idx) {
      return '<div class="brow"><span class="nm">' + esc(basketName(i)) + '</span>' +
        '<span class="qty" role="group" aria-label="' + esc(Q.qty) + '"><button type="button" data-dec="' + idx + '" aria-label="-">&minus;</button><span>' + i.qty + '</span><button type="button" data-inc="' + idx + '" aria-label="+">+</button></span>' +
        '<button type="button" class="linkbtn" data-rm="' + idx + '">' + esc(Q.remove) + '</button></div>';
    }).join('');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-inc],[data-dec],[data-rm]'); if (!t) return;
    var idx;
    if (t.hasAttribute('data-inc')) { idx = +t.getAttribute('data-inc'); basket[idx].qty = Math.min(999, basket[idx].qty + 1); }
    else if (t.hasAttribute('data-dec')) { idx = +t.getAttribute('data-dec'); basket[idx].qty = Math.max(1, basket[idx].qty - 1); }
    else { idx = +t.getAttribute('data-rm'); basket.splice(idx, 1); }
    saveBasket();
  });

  /* ---------- Product data ---------- */
  var STOCK_MAP = { in_stock: 'in_stock', instock: 'in_stock', 'in stock': 'in_stock', available: 'in_stock', yes: 'in_stock', low: 'low', 'low stock': 'low', low_stock: 'low', out: 'out', out_of_stock: 'out', 'out of stock': 'out', no: 'out', order: 'order', 'on order': 'order', on_order: 'order', preorder: 'order', 'pre-order': 'order' };
  function truthy(v) { return /^(yes|y|true|1|x)$/i.test(String(v || '').trim()); }
  function normalize(list) {
    return (list || []).filter(function (r) { return r && r.id && (r.name_en || r.name_sw) && !/^(no|n|false|0)$/i.test(String(r.active || '').trim()); }).map(function (r) {
      var s = String(r.stock || '').trim().toLowerCase().replace(/\s+/g, ' ');
      return { id: String(r.id).trim(), category: String(r.category || '').trim().toLowerCase(), brand: String(r.brand || '').trim(), name_en: r.name_en || r.name_sw, name_sw: r.name_sw || r.name_en, desc_en: r.desc_en || '', desc_sw: r.desc_sw || r.desc_en || '', specs_en: r.specs_en || '', specs_sw: r.specs_sw || r.specs_en || '', price: String(r.price || '').trim(), stock: STOCK_MAP[s] || 'ask', featured: truthy(r.featured), image: String(r.image || '').trim() };
    });
  }
  function parseCSV(text) {
    var rows = [], row = [], cur = '', q = false, i, c;
    text = text.replace(/^\uFEFF/, '');
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c !== '\r') cur += c;
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1).filter(function (r) { return r.join('').trim(); }).map(function (r) { var o = {}; head.forEach(function (h, k) { o[h] = (r[k] || '').trim(); }); return o; });
  }
  function loadProducts(cb) {
    var snapshot = null;
    fetch(base + 'data/products.json?v=' + (K.build || '')).then(function (r) { if (!r.ok) throw new Error('snapshot'); return r.json(); }).then(function (j) {
      snapshot = normalize(j); cb(snapshot, false);
      if (!K.productsSheetCsv) return;
      return fetch(K.productsSheetCsv, { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error('sheet'); return r.text(); }).then(function (t) {
        var live = normalize(parseCSV(t)); if (!live.length) throw new Error('empty');
        lsSet('kazi_products_live', { t: Date.now(), d: live }); cb(live, true);
      }).catch(function () { var c = lsGet('kazi_products_live', null); if (c && c.d && c.d.length) cb(c.d, true); });
    }).catch(function () { if (!snapshot) cb(null, false, true); });
  }
  function fmtPrice(p) {
    if (!p) return P.contactPrice;
    if (/^[\d\s.,]+$/.test(p)) { var n = Number(p.replace(/[^\d.]/g, '')); return isFinite(n) && n > 0 ? P.from + ' ' + n.toLocaleString('en-US') : P.contactPrice; }
    return p;
  }
  function imgUrl(p) { if (!p.image) return ''; return /^https?:\/\//i.test(p.image) ? p.image : base + 'assets/img/products/' + p.image; }
  function nameOf(p) { return p['name_' + lang] || p.name_en; }
  function catIcon(id) { return { laptops: 'laptop', desktops: 'desktop', printers: 'printer', copiers: 'copier', networking: 'network', security: 'cctv', power: 'power', aircon: 'aircon', supplies: 'supplies' }[id] || 'box'; }
  function mediaHtml(p) { var u = imgUrl(p); return u ? '<img src="' + esc(u) + '" alt="" loading="lazy" decoding="async">' : icon(catIcon(p.category)); }

  function cardHtml(p) {
    return '<article class="pcard" data-id="' + esc(p.id) + '" data-cat="' + esc(p.category) + '">' +
      '<button type="button" class="pmedia" data-open aria-label="' + esc(P.details + ': ' + nameOf(p)) + '">' + mediaHtml(p) + '</button>' +
      '<div class="pbody"><p class="pbrand">' + esc(p.brand) + '</p><h3>' + esc(nameOf(p)) + '</h3>' +
      '<p class="pdesc">' + esc(p['desc_' + lang]) + '</p>' +
      '<div class="pmeta"><span class="price">' + esc(fmtPrice(p.price)) + '</span><span class="stock s-' + p.stock + '">' + esc(T.stock[p.stock]) + '</span></div>' +
      '<div class="pactions"><button type="button" class="btn btn-red btn-sm" data-add>' + icon('plus') + esc(P.add) + '</button>' +
      '<a class="btn btn-line btn-sm" target="_blank" rel="noopener" href="' + esc(waLink(P.waProduct(nameOf(p)))) + '">' + esc(P.askWa) + '</a></div></div></article>';
  }

  /* ---------- Products page ---------- */
  var grid = $('#pgrid');
  if (grid) {
    var ALL = [], state = { q: '', cat: '', brand: '', stock: '' };
    var elQ = $('#f-q'), elBrand = $('#f-brand'), elStock = $('#f-stock'), chips = $('#chips'), count = $('#rcount'), clear = $('#fclear'), dlg = $('#pdialog');
    function readHash() { var m = /cat=([a-z_-]+)/.exec(location.hash); state.cat = m ? m[1] : ''; }
    function writeHash() { var h = state.cat ? '#cat=' + state.cat : ''; if (history.replaceState) history.replaceState(null, '', location.pathname + location.search + h); }
    function filtered() {
      var q = state.q.trim().toLowerCase();
      return ALL.filter(function (p) {
        if (state.cat && p.category !== state.cat) return false;
        if (state.brand && p.brand !== state.brand) return false;
        if (state.stock === 'in_stock' && p.stock !== 'in_stock' && p.stock !== 'low') return false;
        if (q && (nameOf(p) + ' ' + p.brand + ' ' + p['desc_' + lang] + ' ' + p.name_en + ' ' + p.name_sw).toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
    }
    function renderChips() {
      var counts = {}; ALL.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
      var html = '<button type="button" data-cat="" aria-pressed="' + (!state.cat) + '">' + esc(P.allCategories) + '<span class="c">' + ALL.length + '</span></button>';
      (T.categories || []).forEach(function (c) { if (counts[c.id]) html += '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + '<span class="c">' + counts[c.id] + '</span></button>'; });
      chips.innerHTML = html;
    }
    function renderBrands() {
      var set = {}; ALL.forEach(function (p) { if (p.brand) set[p.brand] = 1; });
      var b = Object.keys(set).sort(function (a, c) { return a.localeCompare(c); });
      elBrand.innerHTML = '<option value="">' + esc(P.allBrands) + '</option>' + b.map(function (x) { return '<option value="' + esc(x) + '"' + (state.brand === x ? ' selected' : '') + '>' + esc(x) + '</option>'; }).join('');
    }
    function render() {
      var list = filtered();
      count.textContent = P.results(list.length);
      clear.hidden = !(state.q || state.cat || state.brand || state.stock);
      grid.innerHTML = list.length ? list.map(cardHtml).join('') : '<div class="empty" style="grid-column:1/-1">' + esc(P.empty) + '</div>';
      $$('#chips button').forEach(function (b) { b.setAttribute('aria-pressed', String((b.getAttribute('data-cat') || '') === state.cat)); });
    }
    function setData(list) { ALL = list; renderChips(); renderBrands(); render(); }
    grid.innerHTML = '<p class="empty" style="grid-column:1/-1">' + esc(P.loading) + '…</p>';
    readHash();
    loadProducts(function (list, live, failed) { if (failed) { grid.innerHTML = '<div class="empty" style="grid-column:1/-1">' + esc(P.loadErr) + '</div>'; return; } setData(list); });
    elQ.addEventListener('input', function () { state.q = elQ.value; render(); });
    elBrand.addEventListener('change', function () { state.brand = elBrand.value; render(); });
    elStock.addEventListener('change', function () { state.stock = elStock.value; render(); });
    chips.addEventListener('click', function (e) { var b = e.target.closest('button[data-cat]'); if (!b) return; state.cat = b.getAttribute('data-cat'); writeHash(); render(); });
    clear.addEventListener('click', function () { state = { q: '', cat: '', brand: '', stock: '' }; elQ.value = ''; elBrand.value = ''; elStock.value = ''; writeHash(); render(); });
    window.addEventListener('hashchange', function () { readHash(); render(); });

    function openDialog(p) {
      var d = $('#pdialog-body');
      var specs = (p['specs_' + lang] || '').split(';').map(function (s) { return s.trim(); }).filter(Boolean).map(function (s) { var i = s.indexOf(':'); return i > 0 ? '<div><dt>' + esc(s.slice(0, i)) + '</dt><dd>' + esc(s.slice(i + 1).trim()) + '</dd></div>' : ''; }).join('');
      d.innerHTML = '<div class="dlg"><div class="pmedia">' + mediaHtml(p) + '</div><div class="dlg-body"><p class="pbrand">' + esc(p.brand) + '</p><h2 style="font-size:2rem;margin:0">' + esc(nameOf(p)) + '</h2>' +
        '<div class="pmeta" style="margin-top:0"><span class="price">' + esc(fmtPrice(p.price)) + '</span><span class="stock s-' + p.stock + '">' + esc(T.stock[p.stock]) + '</span></div>' +
        '<p>' + esc(p['desc_' + lang]) + '</p>' + (specs ? '<h3 style="font-size:1.2rem;margin:.4em 0 0">' + esc(P.specs) + '</h3><dl class="specs">' + specs + '</dl>' : '') +
        '<div class="pactions"><button type="button" class="btn btn-red" data-add-dlg="' + esc(p.id) + '">' + icon('plus') + esc(P.add) + '</button><a class="btn btn-line" target="_blank" rel="noopener" href="' + esc(waLink(P.waProduct(nameOf(p)))) + '">' + esc(P.askWa) + '</a></div></div></div>';
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    }
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.pcard'); if (!card) return;
      var p = ALL.filter(function (x) { return x.id === card.getAttribute('data-id'); })[0]; if (!p) return;
      if (e.target.closest('[data-add]')) { addToBasket(p); var b = e.target.closest('[data-add]'); b.innerHTML = icon('check') + esc(P.added); setTimeout(function () { b.innerHTML = icon('plus') + esc(P.add); }, 1600); }
      else if (e.target.closest('[data-open]')) openDialog(p);
    });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('.dlg-close')) { dlg.close ? dlg.close() : dlg.removeAttribute('open'); return; }
      var a = e.target.closest('[data-add-dlg]'); if (a) { var p = ALL.filter(function (x) { return x.id === a.getAttribute('data-add-dlg'); })[0]; if (p) { addToBasket(p); dlg.close ? dlg.close() : dlg.removeAttribute('open'); } }
    });
  }

  /* ---------- Featured products (home) ---------- */
  var feat = $('#featured-products');
  if (feat) {
    var featAll = [];
    loadProducts(function (list, live, failed) {
      var sec = $('#featured-section'); if (failed || !sec) return;
      featAll = list;
      var f = list.filter(function (p) { return p.featured; }).slice(0, 4);
      if (!f.length) { sec.hidden = true; return; }
      feat.innerHTML = f.map(cardHtml).join(''); sec.hidden = false;
    });
    feat.addEventListener('click', function (e) {
      var card = e.target.closest('.pcard'); if (!card) return;
      if (e.target.closest('[data-add]')) {
        var p = featAll.filter(function (x) { return x.id === card.getAttribute('data-id'); })[0]; if (p) addToBasket(p);
      } else if (e.target.closest('[data-open]')) { location.href = pageHref('products') + '#cat=' + (card.getAttribute('data-cat') || ''); }
    });
  }

  /* ---------- Forms ---------- */
  var tsLoaded = false;
  function loadTurnstile(cb) {
    if (!K.turnstileSiteKey) return cb && cb();
    if (window.turnstile) return cb && cb();
    if (tsLoaded) { var w = setInterval(function () { if (window.turnstile) { clearInterval(w); cb && cb(); } }, 200); return; }
    tsLoaded = true; var s = document.createElement('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.async = true; s.onload = function () { cb && cb(); }; document.head.appendChild(s);
  }
  // hCaptcha for the free Web3Forms path. This is Web3Forms' shared free-plan site key (documented at docs.web3forms.com); it is public by design.
  var HC_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2', hcLoaded = false;
  function loadHcaptcha(cb) {
    if (window.hcaptcha) return cb && cb();
    if (hcLoaded) { var w = setInterval(function () { if (window.hcaptcha) { clearInterval(w); cb && cb(); } }, 200); return; }
    hcLoaded = true; var s = document.createElement('script'); s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit'; s.async = true; s.onload = function () { cb && cb(); }; document.head.appendChild(s);
  }
  function makeRef() {
    var t = new Date(), ymd = String(t.getFullYear()).slice(2) + String(t.getMonth() + 1).padStart(2, '0') + String(t.getDate()).padStart(2, '0');
    var b = new Uint8Array(3); (window.crypto || window.msCrypto).getRandomValues(b);
    return 'KZ-' + ymd + '-' + Array.prototype.map.call(b, function (x) { return (x % 36).toString(36); }).join('').toUpperCase();
  }
  function whatsappText(d, items) {
    var L = Q.waLabels, lines = [d.kind === 'contact' ? (T.ui.waHello) : Q.waIntro, ''];
    if (d.typeLabel) lines.push(L.type + ': ' + d.typeLabel);
    lines.push(L.name + ': ' + d.name);
    if (d.phone) lines.push(L.phone + ': ' + d.phone);
    if (d.email) lines.push(L.email + ': ' + d.email);
    if (d.org) lines.push(L.org + ': ' + d.org);
    if (d.place) lines.push(L.place + ': ' + d.place);
    if (d.message) lines.push(L.message + ': ' + d.message);
    if (items && items.length) { lines.push(L.items + ':'); items.forEach(function (i) { lines.push('- ' + i.name + ' x ' + i.qty); }); }
    if (d.ref) lines.push('Ref: ' + d.ref);
    return lines.join('\n');
  }
  function initForm(form) {
    var kind = form.getAttribute('data-kind') || 'quote';
    var status = $('.form-status', form), btn = $('button[type=submit]', form), wrapper = form.parentNode, okBox = $('.ok-panel', wrapper);
    var token = '';
    // preselect type from ?type=
    var sel = $('select[name=type]', form), m = /[?&]type=([a-z]+)/.exec(location.search);
    if (sel && m) { for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === m[1]) sel.value = m[1]; }
    if (K.turnstileSiteKey) { var slot = $('.ts-slot', form); loadTurnstile(function () { if (slot && window.turnstile) window.turnstile.render(slot, { sitekey: K.turnstileSiteKey, callback: function (t) { token = t; } }); }); }
    var hcToken = '', hcId = null, useW3 = !K.formEndpoint && !!K.web3formsKey;
    if (useW3) { var hcSlot = $('.ts-slot', form); if (hcSlot) loadHcaptcha(function () { if (window.hcaptcha) hcId = window.hcaptcha.render(hcSlot, { sitekey: HC_SITEKEY, callback: function (t) { hcToken = t; }, 'expired-callback': function () { hcToken = ''; }, 'error-callback': function () { hcToken = ''; } }); }); }
    function setStatus(msg, err) { status.textContent = msg || ''; status.classList.toggle('err', !!err); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, d = { kind: kind, type: sel ? sel.value : 'contact', typeLabel: sel ? sel.options[sel.selectedIndex].text : '', name: (f.name.value || '').trim(), phone: (f.phone.value || '').trim(), email: (f.email.value || '').trim(), org: f.org ? f.org.value.trim() : '', place: f.place ? f.place.value.trim() : '', message: (f.message.value || '').trim(), replyLang: f.replyLang ? f.replyLang.value : lang };
      if (f.website && f.website.value) return; // honeypot
      if (!d.name || (!d.phone && !d.email)) { setStatus(Q.errRequired, true); (d.name ? f.phone : f.name).focus(); return; }
      var items = kind === 'quote' ? basket.map(function (i) { return { id: i.id, name: i.n.en, qty: i.qty }; }) : [];
      if (!K.formEndpoint && !K.web3formsKey) { window.open(waLink(whatsappText(d, items.map(function (i) { return { name: i.name, qty: i.qty }; }))), '_blank', 'noopener'); setStatus(Q.fallbackNote, false); return; }
      if (K.turnstileSiteKey && !token) { setStatus(Q.errSend, true); return; }
      if (useW3 && hcId !== null && !hcToken) { setStatus(lang === 'sw' ? 'Tafadhali thibitisha kuwa wewe si roboti.' : 'Please tick the box to confirm you are not a robot.', true); return; }
      btn.disabled = true; setStatus(Q.sending + '…', false);
      if (!K.formEndpoint && K.web3formsKey) {
        // Free path: Web3Forms emails the request to the shop. No autoresponder on the free plan, so we make the reference number here.
        var ref = makeRef(), typeText = d.typeLabel || (kind === 'contact' ? 'Message' : 'Request');
        var lines = [];
        lines.push('Reference: ' + ref, 'Type: ' + typeText, 'Name: ' + d.name);
        if (d.phone) lines.push('Phone: ' + d.phone);
        if (d.email) lines.push('Email: ' + d.email);
        if (d.org) lines.push('Organisation: ' + d.org);
        if (d.place) lines.push('Location: ' + d.place);
        lines.push('Reply in: ' + (d.replyLang === 'sw' ? 'Kiswahili' : 'English'));
        if (d.message) lines.push('', 'Message:', d.message);
        if (items.length) { lines.push('', 'Products:'); items.forEach(function (i) { lines.push('- ' + i.name + ' x ' + i.qty); }); }
        lines.push('', 'Sent from: ' + location.href);
        var w3 = { access_key: K.web3formsKey, subject: '[' + ref + '] ' + typeText + ' - ' + d.name, from_name: 'Kazi Electronics website', name: d.name, message: lines.join('\n') };
        if (d.email) w3.email = d.email;
        if (hcToken) w3['h-captcha-response'] = hcToken;
        fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(w3) })
          .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j && j.success, j: j }; }); })
          .then(function (res) {
            if (!res.ok) throw new Error('send');
            d.ref = ref; var wa = waLink(whatsappText(d, items.map(function (i) { return { name: i.name, qty: i.qty }; })));
            okBox.innerHTML = '<h2>' + esc(Q.okTitle) + '</h2><p>' + esc(Q.okText(d.name, ref)) + '</p><a class="btn btn-red" target="_blank" rel="noopener" href="' + esc(wa) + '">' + icon('whatsapp') + esc(Q.okWa) + '</a>';
            form.hidden = true; okBox.hidden = false; okBox.setAttribute('tabindex', '-1'); okBox.focus();
            if (kind === 'quote') { basket = []; saveBasket(); }
            form.reset();
          })
          .catch(function () { setStatus(Q.errSend, true); })
          .then(function () { btn.disabled = false; hcToken = ''; if (hcId !== null && window.hcaptcha) try { window.hcaptcha.reset(hcId); } catch (x) {} });
        return;
      }
      var payload = { type: d.type, name: d.name, phone: d.phone, email: d.email, org: d.org, place: d.place, message: d.message, lang: d.replyLang, page: location.pathname, items: items, token: token };
      fetch(K.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j && j.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error('send');
          d.ref = res.j.ref; var wa = waLink(whatsappText(d, items.map(function (i) { return { name: i.name, qty: i.qty }; })));
          okBox.innerHTML = '<h2>' + esc(Q.okTitle) + '</h2><p>' + esc(Q.okText(d.name, res.j.ref)) + '</p><a class="btn btn-red" target="_blank" rel="noopener" href="' + esc(wa) + '">' + icon('whatsapp') + esc(Q.okWa) + '</a>';
          form.hidden = true; okBox.hidden = false; okBox.setAttribute('tabindex', '-1'); okBox.focus();
          if (kind === 'quote') { basket = []; saveBasket(); }
          form.reset();
        })
        .catch(function () { setStatus(Q.errSend, true); if (window.turnstile) try { window.turnstile.reset(); token = ''; } catch (x) {} })
        .then(function () { btn.disabled = false; });
    });
  }
  $$('form[data-kazi-form]').forEach(initForm);

  /* ---------- Newsletter ---------- */
  $$('[data-subscribe]').forEach(function (box) {
    if (!K.formEndpoint) { box.hidden = true; return; }
    var form = $('form', box), msg = $('.sub-msg', box);
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var em = form.elements.email.value.trim(); if (!em) return;
      fetch(K.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'subscribe', email: em, lang: lang, website: form.elements.website ? form.elements.website.value : '' }) })
        .then(function (r) { return r.json(); }).then(function (j) { if (!j.ok) throw 0; msg.textContent = T.ui.subscribeOk; form.reset(); })
        .catch(function () { msg.textContent = T.ui.subscribeErr; });
    });
  });

  renderBadges(); renderBasket();
})();
