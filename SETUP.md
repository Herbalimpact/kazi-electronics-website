# Kazi Electronics Services — setup and handover guide

The site is plain static files built by a small script and hosted free on **GitHub Pages**. Anything that needs a
"backend" (quote forms, emails, the newsletter) runs on one tiny **Cloudflare Worker**; product prices come from a
**Google Sheet**. Nothing here needs a paid server.

```
Visitors ──▶ kazi-electronics.com (GitHub Pages, built by GitHub Actions from this repo)
                 │
                 ├── product list ◀── Google Sheet (Joel edits prices/stock; live within minutes)
                 └── quote & contact forms ──▶ Cloudflare Worker ──▶ Brevo ──▶ staff inbox + customer acknowledgement
                                        (no Worker yet? the forms open WhatsApp with the message pre-filled)
```

The site works on its own from step 3. Steps 5–7 switch on the extras; do them in that order.

---

## 0. Before you upload anything: protect the company documents

The repository is **public**. The company profile PDF in it very likely contains scans of the TIN, VAT and business
licence certificates, and anyone can open it on GitHub.

**Recommended:** do **not** reuse the old repository. Create a new one (for example `kazi-electronics-website`), upload
only this project, and delete the old repo. Git keeps history, so deleting a file from the old repo is not enough.
(Making the old repo private also works, but GitHub Pages on private repos needs a paid GitHub plan. Check GitHub's
current plan limits.) Keep the profile PDF and the proposal in Google Drive instead.

## 1. Put the files on GitHub

Use **GitHub Desktop** or the command line rather than drag-and-drop in the browser. Browser upload silently drops
nested folders, and this project depends on folders (`src/`, `scripts/`, `.github/workflows/`).

```bash
git clone https://github.com/<account>/<new-repo>.git
# copy the contents of this project into the cloned folder (include the hidden .github folder)
cd <new-repo>
git add -A
git commit -m "Kazi Electronics website"
git push
```

Check on GitHub that `.github/workflows/deploy.yml` is there. On a Mac, press Cmd+Shift+. in Finder to show hidden folders.

## 2. Turn on GitHub Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Then open the **Actions** tab. The "Build and deploy site" run should turn green in about a minute.
The site is temporarily visible at `https://<account>.github.io/<repo>/` (that address only shows the
unstyled shell; the real address is the custom domain below, because pages use absolute links from the domain root).

## 3. Connect kazi-electronics.com (Cloudflare DNS)

Cloudflare → `kazi-electronics.com` → **DNS → Records**. Delete any old parking `A`/`AAAA` records for `@` and `www`, then add:

| Type  | Name | Content              | Proxy       |
|-------|------|----------------------|-------------|
| A     | @    | 185.199.108.153      | DNS only (grey cloud) |
| A     | @    | 185.199.109.153      | DNS only |
| A     | @    | 185.199.110.153      | DNS only |
| A     | @    | 185.199.111.153      | DNS only |
| CNAME | www  | `herbalimpact.github.io` (your GitHub account name, lower-case + `.github.io`) | DNS only |

Then in the repo: **Settings → Pages → Custom domain → `kazi-electronics.com` → Save**, tick **Enforce HTTPS** once it
becomes available (can take up to an hour). The `CNAME` file is already produced by the build.
Keep the grey cloud until HTTPS is issued; you can turn the proxy on afterwards if you want Cloudflare's caching.

## 4. Business email on the domain

You need three addresses. Only the first one is shown publicly.

| Address | Purpose |
|---------|---------|
| `info@kazi-electronics.com`   | shown on the website; general enquiries |
| `sales@kazi-electronics.com`  | receives every quote request from the website |
| `quotes@kazi-electronics.com` | the "from" address of automatic emails (needs no mailbox) |

**Option A — real mailboxes (recommended): Zoho Mail free plan.** Add the domain in Zoho, verify it, and add the MX
records it gives you in Cloudflare. As far as I know the free plan gives a few web-mail mailboxes on your own domain;
check Zoho's current limits. Create `info@` and `sales@` for Joel and whoever answers enquiries.

**Option B — forwarding only (5 minutes): Cloudflare Email Routing.** Cloudflare → Email → Email Routing → create
`info@` and `sales@` and forward them to the existing Yahoo address. You can receive but replies come from Yahoo.

Do **not** mix the two: an address has one set of MX records.

## 5. Brevo (sending email) — free plan

Brevo works from Tanzania. The free plan allows 300 emails a day, including transactional email, which is far more than
this site needs. It does not need SMS or WhatsApp credits, which are the only country-priced parts.

1. Create the account at brevo.com and complete its identity check.
2. **Senders, Domains & Dedicated IPs → Domains → Add `kazi-electronics.com`** and copy the DNS records it shows
   (a `brevo-code` TXT, two DKIM records and a DMARC record) into Cloudflare. Click **Authenticate**.
3. **Add the sender** `quotes@kazi-electronics.com`.
4. **One SPF record only.** If you use Zoho for mailboxes, edit the single existing `TXT` record on `@` so it contains both
   senders, for example `v=spf1 include:<value Zoho shows> include:spf.brevo.com ~all`. Two separate SPF records break email.
5. Add a DMARC record if Brevo did not: `TXT` on `_dmarc` with `v=DMARC1; p=none; rua=mailto:info@kazi-electronics.com`.
6. **SMTP & API → API keys → Generate** and keep the key for step 6.
7. Optional newsletter: **Contacts → Lists →** create "Kazi – English" and "Kazi – Kiswahili" and note both list ids.

## 6. The forms Worker (Cloudflare, free)

1. Cloudflare → **Workers & Pages → Create → Create Worker** → name it `kazi-forms` → **Deploy**, then **Edit code**.
2. Delete the sample code, paste in the whole of `worker/index.js`, **Deploy**.
3. **Settings → Variables and secrets** → add:

   | Name | Value | Type |
   |------|-------|------|
   | `BREVO_API_KEY` | key from step 5.6 | **Secret** |
   | `SENDER_EMAIL` | `quotes@kazi-electronics.com` | Text |
   | `STAFF_EMAIL` | `sales@kazi-electronics.com` (add `,kazi57@yahoo.com` to also copy the old address) | Text |
   | `BREVO_LIST_ID_EN` / `BREVO_LIST_ID_SW` | your list ids (skip if no newsletter) | Text |

4. **Settings → Domains & Routes → Add → Custom domain →** `api.kazi-electronics.com`. (Cloudflare creates the DNS record.)
5. In `src/site.config.js` set `formEndpoint: 'https://api.kazi-electronics.com'`, commit, wait for the green build.
6. **Test:** open the Request a quote page, send a test. `sales@` should get the request and your test email should
   get an acknowledgement. Try it once in English and once in Kiswahili.

**Spam protection (recommended):** Cloudflare → Turnstile → Add site → hostname `kazi-electronics.com`. Put the *site key*
in `turnstileSiteKey` in `site.config.js` and the *secret key* in the Worker as secret `TURNSTILE_SECRET`.

If a form ever fails, the visitor sees a message and can send the same text on WhatsApp, so no enquiry is lost.

## 6b. Free alternative to Brevo + Worker: Web3Forms (quote and contact forms only)

Use this if Brevo is not set up yet. It costs nothing (free plan: 250 submissions a month, one main recipient).

1. Go to web3forms.com, enter `info@kazi-electronics.com`, and create the access key. It is emailed to that address.
2. In `src/site.config.js` set `web3formsKey: 'your-access-key'` (leave `formEndpoint` blank), commit, wait for the green build.
3. Test: send a quote in English and Kiswahili. `info@` receives each request with a reference number in the subject.

Notes: the access key is meant to be public (it only lets people send email to that one inbox). The free plan sends
no acknowledgement email to the customer and keeps 30 days of history, so keep the emails. The footer newsletter box stays
hidden (it needs Brevo). If `formEndpoint` is later set (Brevo Worker), it takes priority over Web3Forms.

## 7. Products and prices: the Google Sheet (Joel's job)

1. Create a Google Sheet and import `docs/products-template.csv` (File → Import → Upload → *Replace current sheet*).
   It already lists the starter products. Keep the first row (column names) exactly as it is.
2. **File → Share → Publish to web →** choose this sheet → **Comma-separated values (.csv)** → Publish. Copy the link.
3. Paste that link into `productsSheetCsv` in `src/site.config.js`, commit. From then on, **edits to the sheet appear on the site within a few minutes with no rebuild.**
4. Share the sheet (edit access) with Joel only.

| Column | What to put |
|--------|-------------|
| `id` | short unique code, lower-case, no spaces, e.g. `hp-15-laptop` (never reuse) |
| `category` | one of: `laptops` `desktops` `printers` `copiers` `networking` `security` `power` `aircon` `supplies` |
| `brand` | e.g. HP, Dell, Epson (used by the Brand filter) |
| `name_en`, `name_sw` | product name in each language (if Swahili is empty, English is shown) |
| `desc_en`, `desc_sw` | one or two sentences |
| `specs_en`, `specs_sw` | optional, like `CPU: Core i5; RAM: 16 GB; Storage: 512 GB SSD` (separate items with `;`) |
| `price` | a number in TZS, like `1250000`, or text such as `From 550000`. Empty = "Contact for price" |
| `stock` | `in_stock`, `low`, `out`, `order`, or empty = "Call to confirm stock" |
| `featured` | `yes` shows it on the home page (the first four are used) |
| `image` | file name such as `hp-15.webp` uploaded to `src/assets/img/products/` (or a full https link). Empty = category icon |
| `active` | `no` hides the row without deleting it |

Product photos: about 800 px wide, plain background, under 100 KB, `.webp` or `.jpg`.

## 8. Photos, testimonials and other placeholders

Anything marked "Photo coming soon" is replaced automatically when a file with the right name exists in the folder. In GitHub, open the folder →
**Add file → Upload files** (one folder at a time) → commit. The site rebuilds in about a minute.

| Where | File names |
|-------|-----------|
| `src/assets/img/team/` | `team-1.webp`, `team-2.webp`, `team-3.webp` |
| `src/assets/img/workshop/` | `workshop-1.webp`, `workshop-2.webp` |
| `src/assets/img/projects/` | `lan-1`, `lan-2`, `cctv-1`, `cctv-2` (`.webp`, `.jpg` or `.png`) |

**Testimonials:** edit `src/data/testimonials.json` (currently `[]`). Format:
```json
[{ "name": "A. Mushi", "org": "Example Ltd", "quote_en": "Fast, honest service.", "quote_sw": "Huduma ya haraka na ya uaminifu." }]
```
**Hide every placeholder** (before launch, if you prefer): set `showPlaceholders: false` in `src/site.config.js`.

## 9. Changing text, numbers and hours

| To change | Edit |
|-----------|------|
| phone, email, address, hours, WhatsApp number | `src/site.config.js` |
| English wording | `src/i18n/en.js` |
| Kiswahili wording (**have a Swahili speaker review this file before launch**) | `src/i18n/sw.js` (starter product names in Swahili: `src/data/products.json`) |
| clients shown | `scripts/build.js` (`CLIENTS` list) and `src/assets/img/clients/` |

On GitHub click the file → pencil icon → edit → **Commit changes**. The site redeploys itself.
Everything can also be tested locally with `node scripts/build.js` and opening `dist/`.

## 10. Launch checklist

- [x] Second phone number: +255 772 600 100 (already set in `phoneSecondary`).
- [ ] `info@` and `sales@` mailboxes exist and receive mail.
- [ ] Test quote sent in English and Kiswahili; acknowledgement email received (check spam).
- [ ] Someone fluent in Kiswahili has reviewed `src/i18n/sw.js` (Joel, when available).
- [ ] Starter product list edited to real stock, or the sheet connected.
- [ ] HTTPS enforced; `https://www.kazi-electronics.com` redirects to the main address.
- [ ] Google Search Console: add `kazi-electronics.com` as a Domain property (TXT record in Cloudflare), submit `https://kazi-electronics.com/sitemap.xml`.
- [ ] Google Business Profile for the Samora Avenue shop (free): correct hours (Mon–Fri) and the website address.
- [ ] Certificates, TIN and licence scans are **not** in the repository.

## What was left out of the original proposal (and why)

A static site cannot hold a database, so these are replaced rather than dropped:

| Proposal item | What Kazi gets instead |
|---------------|------------------------|
| Admin panel with staff roles | Google Sheet for products (Joel) + GitHub for text/photos |
| Quote inbox and service tickets | Email to `sales@` with a reference number + acknowledgement to the customer; WhatsApp button on every page |
| Service status tracker | Not included (needs a database). Can be added later as a paid upgrade |
| Newsletter campaigns | Brevo list and campaigns; footer signup form works once the Worker is live |
| Blog / news | Not in phase 1 (page structure is ready to add it) |
| Online payment / checkout | Not in scope: quote-only, as agreed |
| WhatsApp Business API | Click-to-chat only, as agreed |
