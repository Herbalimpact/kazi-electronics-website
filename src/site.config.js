// ─────────────────────────────────────────────────────────────
//  KAZI ELECTRONICS SERVICES — site settings
//  Edit this file, push to GitHub, and the site rebuilds itself.
// ─────────────────────────────────────────────────────────────
module.exports = {
  siteUrl: 'https://kazi-electronics.com',
  legalName: 'Kazi Electronics Services',
  regNo: '179861',
  founded: 2008,

  // Contact (shown publicly)
  phoneMain: '+255 715 267 903',          // also used for WhatsApp
  whatsapp: '255715267903',               // digits only, country code first, no "+"
  phoneSecondary: '+255 772 600 100',     // confirmed by the client (the old profile also showed 0722 600 100, which is not used)
  email: 'info@kazi-electronics.com',     // must exist before launch (see SETUP.md, step 5)
  addressLine1: 'Matasalamat Building, Samora Avenue',
  addressLine2: 'City Centre, Dar es Salaam, Tanzania',
  poBox: 'P.O. Box 13700, Dar es Salaam',
  mapsQuery: 'Matasalamat Building, Samora Avenue, Dar es Salaam',

  // Hours (Mon–Fri only)
  hoursOpen: '08:00',
  hoursClose: '17:00',

  // Front-end integrations (leave blank until set up — the site falls back to WhatsApp)
  formEndpoint: '',          // Cloudflare Worker URL, e.g. https://api.kazi-electronics.com/submit (needs Brevo; takes priority if set)
  web3formsKey: '24e1976c-37f8-48cc-be30-bd1a41305e1f',          // FREE alternative: Web3Forms access key (web3forms.com). Requests are emailed to the address the key was created with.
  turnstileSiteKey: '',      // Cloudflare Turnstile site key (optional, blocks spam bots)
  productsSheetCsv: '',      // "Publish to web → CSV" link of the Google Sheet with products & prices

  // Show clearly-marked placeholder blocks (team, workshop, projects, testimonials)
  // until real photos/quotes are added. Set to false to hide them all.
  showPlaceholders: true,

  social: { facebook: '', instagram: '', linkedin: '' }
};
