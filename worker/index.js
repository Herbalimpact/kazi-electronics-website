/**
 * Kazi Electronics Services — form handler (Cloudflare Worker)
 *
 * What it does
 *   POST {type:'quote'|'repair'|'installation'|'contract'|'print'|'products'|'other'|'contact', name, phone, email, ...}
 *     → emails the Kazi team (STAFF_EMAIL) and, if the customer gave an email, sends them an acknowledgement
 *       in their chosen language (English or Kiswahili).
 *   POST {type:'subscribe', email, lang}
 *     → adds the address to the Brevo newsletter list for that language.
 *
 * Secrets / variables (Cloudflare dashboard → Worker → Settings → Variables and Secrets)
 *   BREVO_API_KEY       (secret)   Brevo → SMTP & API → API keys
 *   TURNSTILE_SECRET    (secret, optional) enables bot protection; also set turnstileSiteKey in src/site.config.js
 *   SENDER_EMAIL        e.g. quotes@kazi-electronics.com   (must be an authenticated sender in Brevo)
 *   SENDER_NAME         default "Kazi Electronics Services"
 *   STAFF_EMAIL         comma-separated inboxes that receive new requests, e.g. sales@kazi-electronics.com,kazi57@yahoo.com
 *   REPLY_TO_EMAIL      default = SENDER_EMAIL (where customer replies to acknowledgements should go)
 *   ALLOWED_ORIGINS     default "https://kazi-electronics.com,https://www.kazi-electronics.com"
 *   BREVO_LIST_ID_EN / BREVO_LIST_ID_SW   newsletter list ids (or BREVO_LIST_ID for a single list)
 *   WHATSAPP_NUMBER     digits only, default 255715267903
 */

const TYPE_LABELS = {
  en: { products: 'Buy equipment', repair: 'Repair or service', installation: 'Installation', contract: 'Maintenance contract', print: 'Design and printing', other: 'Something else', contact: 'Message' },
  sw: { products: 'Nunua vifaa', repair: 'Ukarabati au huduma', installation: 'Usimikaji', contract: 'Mkataba wa matengenezo', print: 'Ubunifu na uchapishaji', other: 'Jambo lingine', contact: 'Ujumbe' }
};

const ACK = {
  en: {
    subject: (ref) => `We received your request (${ref})`,
    hello: (n) => `Hello ${n},`,
    body: 'Thank you for contacting Kazi Electronics Services. We have received your request and will reply during working hours (Monday to Friday, 8:00 to 17:00).',
    ref: 'Your reference',
    summary: 'What you sent us',
    urgent: 'For something urgent, call or message us on WhatsApp:',
    sign: 'Kazi Electronics Services',
    addr: 'Matasalamat Building, Samora Avenue, Dar es Salaam'
  },
  sw: {
    subject: (ref) => `Tumepokea ombi lako (${ref})`,
    hello: (n) => `Habari ${n},`,
    body: 'Asante kwa kuwasiliana na Kazi Electronics Services. Tumepokea ombi lako na tutajibu ndani ya saa za kazi (Jumatatu hadi Ijumaa, 8:00 hadi 17:00).',
    ref: 'Namba yako ya kumbukumbu',
    summary: 'Ulichotutumia',
    urgent: 'Kwa jambo la dharura, tupigie au tuandikie WhatsApp:',
    sign: 'Kazi Electronics Services',
    addr: 'Jengo la Matasalamat, Samora Avenue, Dar es Salaam'
  }
};

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, n);
const clipMulti = (s, n) => String(s == null ? '' : s).replace(/\r/g, '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, n);
const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

function json(body, status, cors) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors } });
}
function makeRef() {
  const d = new Date();
  const ymd = String(d.getUTCFullYear()).slice(2) + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0');
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  const rnd = Array.from(bytes).map((b) => (b % 36).toString(36)).join('').toUpperCase();
  return `KZ-${ymd}-${rnd}`;
}

async function verifyTurnstile(token, secret, ip) {
  const body = new URLSearchParams({ secret, response: token || '' });
  if (ip) body.set('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const j = await r.json().catch(() => ({}));
  return !!j.success;
}

async function brevoSend(env, payload) {
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('brevo_send_' + r.status + ': ' + (await r.text()).slice(0, 300));
}

function itemsRows(items) {
  return items.map((i) => `<tr><td style="padding:4px 12px 4px 0">${esc(i.name)}</td><td style="padding:4px 0"><b>× ${esc(i.qty)}</b></td></tr>`).join('');
}

function staffHtml(d, ref, typeLabel) {
  const row = (k, v) => (v ? `<tr><td style="padding:4px 14px 4px 0;color:#556682;vertical-align:top">${k}</td><td style="padding:4px 0">${esc(v).replace(/\n/g, '<br>')}</td></tr>` : '');
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#14213B">
<h2 style="margin:0 0 4px;color:#0A1730">New ${esc(typeLabel)} request</h2><p style="margin:0 0 14px;color:#556682">Reference <b>${esc(ref)}</b> · website language: ${esc(d.lang.toUpperCase())} · from ${esc(d.page || '')}</p>
<table style="border-collapse:collapse">${row('Name', d.name)}${row('Phone', d.phone)}${row('Email', d.email)}${row('Organisation', d.org)}${row('Location', d.place)}${row('Reply in', d.lang === 'sw' ? 'Kiswahili' : 'English')}${row('Message', d.message)}</table>
${d.items.length ? `<h3 style="margin:18px 0 6px">Products</h3><table style="border-collapse:collapse">${itemsRows(d.items)}</table>` : ''}
<p style="margin-top:18px;color:#556682">Reply to this email to answer the customer${d.email ? '' : ' (they gave a phone number only — call or use WhatsApp)'}.</p></div>`;
}

function ackHtml(d, ref, L, typeLabel, waNumber) {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#14213B;max-width:560px">
<div style="background:#0A1730;padding:16px 20px;border-bottom:3px solid #D91A21"><span style="color:#fff;font-size:20px;font-weight:bold;letter-spacing:.5px">KAZI ELECTRONICS SERVICES</span></div>
<div style="padding:20px 4px"><p>${esc(L.hello(d.name))}</p><p>${esc(L.body)}</p>
<p style="background:#F3F6FA;padding:12px 14px;border-left:4px solid #D91A21;margin:16px 0"><span style="color:#556682">${esc(L.ref)}</span><br><b style="font-size:18px">${esc(ref)}</b></p>
<p style="margin-bottom:4px"><b>${esc(L.summary)}</b> (${esc(typeLabel)})</p>
<div style="color:#556682">${d.message ? esc(d.message).replace(/\n/g, '<br>') : ''}${d.items.length ? `<table style="border-collapse:collapse;margin-top:8px">${itemsRows(d.items)}</table>` : ''}</div>
<p style="margin-top:20px">${esc(L.urgent)} <a href="https://wa.me/${esc(waNumber)}">+${esc(waNumber)}</a></p>
<p style="margin-top:22px;color:#556682">${esc(L.sign)}<br>${esc(L.addr)}</p></div></div>`;
}

async function handleSubscribe(d, env, cors) {
  if (!EMAIL_RE.test(d.email)) return json({ ok: false, error: 'email' }, 400, cors);
  const listId = Number(d.lang === 'sw' ? (env.BREVO_LIST_ID_SW || env.BREVO_LIST_ID) : (env.BREVO_LIST_ID_EN || env.BREVO_LIST_ID));
  if (!listId) return json({ ok: false, error: 'not_configured' }, 503, cors);
  const r = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ email: d.email, listIds: [listId], updateEnabled: true })
  });
  if (!r.ok && r.status !== 204) return json({ ok: false, error: 'brevo' }, 502, cors);
  return json({ ok: true }, 200, cors);
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGINS || 'https://kazi-electronics.com,https://www.kazi-electronics.com').split(',').map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, cors);
    if (origin && !allowed.includes(origin)) return json({ ok: false, error: 'origin' }, 403, cors);

    let raw;
    try {
      const text = await request.text();
      if (text.length > 20000) return json({ ok: false, error: 'too_large' }, 413, cors);
      raw = JSON.parse(text);
    } catch (e) { return json({ ok: false, error: 'bad_json' }, 400, cors); }

    // Honeypot: bots fill the hidden "website" field. Pretend success, do nothing.
    if (raw.website) return json({ ok: true, ref: makeRef() }, 200, cors);

    const lang = raw.lang === 'sw' ? 'sw' : 'en';
    if (env.TURNSTILE_SECRET && raw.type !== 'subscribe') {
      const ok = await verifyTurnstile(String(raw.token || ''), env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP'));
      if (!ok) return json({ ok: false, error: 'captcha' }, 403, cors);
    }
    if (!env.BREVO_API_KEY) return json({ ok: false, error: 'not_configured' }, 503, cors);

    if (raw.type === 'subscribe') return handleSubscribe({ email: clip(raw.email, 200), lang }, env, cors);

    const type = TYPE_LABELS.en[raw.type] ? raw.type : 'other';
    const d = {
      lang, type,
      name: clip(raw.name, 120), phone: clip(raw.phone, 40), email: clip(raw.email, 200),
      org: clip(raw.org, 160), place: clip(raw.place, 160), message: clipMulti(raw.message, 4000), page: clip(raw.page, 200),
      items: (Array.isArray(raw.items) ? raw.items : []).slice(0, 40).map((i) => ({ name: clip(i && i.name, 160), qty: Math.max(1, Math.min(9999, parseInt(i && i.qty, 10) || 1)) })).filter((i) => i.name)
    };
    if (!d.name || (!d.phone && !d.email)) return json({ ok: false, error: 'missing' }, 400, cors);
    if (d.email && !EMAIL_RE.test(d.email)) return json({ ok: false, error: 'email' }, 400, cors);

    const ref = makeRef();
    const senderEmail = env.SENDER_EMAIL || 'quotes@kazi-electronics.com';
    const sender = { name: env.SENDER_NAME || 'Kazi Electronics Services', email: senderEmail };
    const staff = (env.STAFF_EMAIL || '').split(',').map((s) => s.trim()).filter(Boolean).map((email) => ({ email }));
    if (!staff.length) return json({ ok: false, error: 'not_configured' }, 503, cors);
    const waNumber = env.WHATSAPP_NUMBER || '255715267903';
    const typeLabelEn = TYPE_LABELS.en[type];

    try {
      // 1) notify staff (must succeed)
      await brevoSend(env, {
        sender, to: staff,
        ...(d.email ? { replyTo: { email: d.email, name: d.name } } : {}),
        subject: `[${ref}] ${typeLabelEn} — ${d.name}`,
        htmlContent: staffHtml(d, ref, typeLabelEn)
      });
    } catch (e) {
      console.error(String(e));
      return json({ ok: false, error: 'send' }, 502, cors);
    }
    // 2) acknowledge the customer (best effort)
    if (d.email) {
      try {
        const L = ACK[lang];
        await brevoSend(env, {
          sender, to: [{ email: d.email, name: d.name }],
          replyTo: { email: env.REPLY_TO_EMAIL || senderEmail, name: sender.name },
          subject: L.subject(ref),
          htmlContent: ackHtml(d, ref, L, TYPE_LABELS[lang][type], waNumber)
        });
      } catch (e) { console.error('ack failed: ' + String(e)); }
    }
    return json({ ok: true, ref }, 200, cors);
  }
};
