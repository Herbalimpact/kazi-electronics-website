# Kazi Electronics Services — website

Bilingual (English / Kiswahili) website for **Kazi Electronics Services**, Matasalamat Building, Samora Avenue, Dar es Salaam.
Static site on GitHub Pages at <https://kazi-electronics.com>.

**Start with [SETUP.md](SETUP.md)** — it covers GitHub, DNS, business email, Brevo, the forms Worker, the product sheet and the launch checklist.

| Folder / file | What it is |
|---------------|-----------|
| `src/site.config.js` | phone, email, address, hours, and the on/off switches for forms, product sheet and placeholders |
| `src/i18n/en.js`, `sw.js` | all page text, English and Kiswahili |
| `src/data/products.json` | starter product list (replaced by the Google Sheet once connected) |
| `src/assets/` | CSS, JavaScript, fonts, logo, photos, client logos |
| `scripts/build.js` | turns the above into the finished site in `dist/` |
| `worker/` | Cloudflare Worker that receives quote forms and sends email through Brevo (`node worker/test.mjs` runs its tests) |
| `docs/products-template.csv` | import this into Google Sheets to manage products and prices |
| `.github/workflows/deploy.yml` | builds and publishes the site on every push to `main` |

```bash
node scripts/build.js      # writes ./dist  (needs Node 18+, no npm install)
```

Do not commit company registration, TIN, VAT or licence documents to this repository.
