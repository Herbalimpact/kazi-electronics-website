import worker from './index.js';
const sent=[]; let subs=[];
globalThis.fetch = async (url, opts) => {
  const body = opts && opts.body ? JSON.parse(opts.body) : null;
  if (String(url).includes('/smtp/email')) { sent.push(body); return new Response('{"messageId":"x"}',{status:201}); }
  if (String(url).includes('/contacts')) { subs.push(body); return new Response(null,{status:204}); }
  throw new Error('unexpected '+url);
};
const env={BREVO_API_KEY:'k',STAFF_EMAIL:'sales@kazi-electronics.com,kazi57@yahoo.com',SENDER_EMAIL:'quotes@kazi-electronics.com',BREVO_LIST_ID_EN:'3',BREVO_LIST_ID_SW:'4'};
const call=(body,origin='https://kazi-electronics.com',method='POST')=>worker.fetch(new Request('https://api.kazi-electronics.com/submit',{method,headers:{'Origin':origin,'Content-Type':'application/json'},body:method==='POST'?JSON.stringify(body):undefined}),env);
let ok=0,fail=0; const t=(n,c)=>{ if(c){ok++;console.log('  ok  ',n)}else{fail++;console.log('  FAIL',n)} };

let r=await call({type:'quote',name:'Asha <b>',phone:'0712000000',email:'asha@example.com',org:'Acme',place:'Kariakoo',message:'Need 2 laptops\nthanks',lang:'sw',page:'/sw/omba-bei/',items:[{name:'HP laptops',qty:2}]});
let j=await r.json();
t('quote → 200 + ref', r.status===200 && /^KZ-\d{6}-[0-9A-Z]{3}$/.test(j.ref));
t('two emails sent (staff + customer)', sent.length===2);
t('staff email goes to both inboxes', sent[0].to.length===2 && sent[0].replyTo.email==='asha@example.com');
t('HTML in name is escaped', !sent[0].htmlContent.includes('Asha <b>') && sent[0].htmlContent.includes('Asha &lt;b&gt;'));
t('ack is Swahili', sent[1].subject.startsWith('Tumepokea ombi lako') && sent[1].htmlContent.includes('Habari'));
t('CORS header echoes origin', r.headers.get('Access-Control-Allow-Origin')==='https://kazi-electronics.com');

sent.length=0;
r=await call({type:'repair',name:'Juma',phone:'0755111222',lang:'en',message:'Printer jams'}); j=await r.json();
t('phone-only request works, only staff email sent', r.status===200 && sent.length===1 && !sent[0].replyTo);

sent.length=0;
r=await call({type:'quote',name:'',phone:'',email:'',lang:'en'});
t('missing name/contact → 400', r.status===400 && sent.length===0);
r=await call({type:'quote',name:'X',email:'not-an-email'});
t('bad email → 400', r.status===400);
r=await call({type:'quote',name:'Bot',phone:'1',website:'http://spam'}); j=await r.json();
t('honeypot → fake success, nothing sent', r.status===200 && j.ok && sent.length===0);
r=await call({type:'quote',name:'X',phone:'1'},'https://evil.example');
t('wrong origin → 403', r.status===403);
r=await call(null,'https://kazi-electronics.com','OPTIONS');
t('preflight → 204', r.status===204 && r.headers.get('Access-Control-Allow-Methods').includes('POST'));
r=await call({},'https://kazi-electronics.com','GET');
t('GET → 405', r.status===405);
r=await call({type:'subscribe',email:'a@b.co',lang:'sw'}); j=await r.json();
t('subscribe (sw) uses SW list 4', j.ok && subs[0].listIds[0]===4);
r=await call({type:'subscribe',email:'bad'});
t('subscribe bad email → 400', r.status===400);
// Brevo failure on staff mail → 502
const realFetch=globalThis.fetch; globalThis.fetch=async()=>new Response('nope',{status:401});
r=await call({type:'quote',name:'X',phone:'1'}); t('Brevo failure → 502 (form shows error + WhatsApp fallback)', r.status===502);
globalThis.fetch=realFetch;
// turnstile
env.TURNSTILE_SECRET='s';
globalThis.fetch=async(u)=> String(u).includes('turnstile')? new Response(JSON.stringify({success:false})) : realFetch(u);
r=await call({type:'quote',name:'X',phone:'1',token:'bad'}); t('bad captcha → 403', r.status===403);
console.log(`\n${ok} passed, ${fail} failed`); process.exit(fail?1:0);
