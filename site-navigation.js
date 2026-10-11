/* Consistent site-wide navigation and page-state handling. Does not alter homepage hero/logo animation. */
(function(){
 const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 const home=path===''||path==='index.html';
 document.documentElement.classList.add('scanscope-site');
 if(home) document.body.classList.add('scanscope-home');
 const pages=[
 ['Home','index.html'],['About','about.html'],['About Us','about.html'],
 ['Services','capabilities.html'],['Capabilities','capabilities.html'],
 ['Industries','industries.html'],['Projects','projects.html'],['Our Projects','projects.html'],
 ['Equipment','equipment.html'],['Quality & Safety','quality.html'],['Quality and Safety','quality.html'],
 ['Resources','resources.html'],['FAQs','faq.html'],['FAQ','faq.html'],['Contact','contact.html'],
 ['Contact Us','contact.html'],['Ultrasonic Testing','ultrasonic-testing.html'],
 ['Radiographic Testing','radiographic-testing.html'],['Visual Inspection','visual-inspection.html'],
 ['Thickness Measurement','thickness-measurement.html'],['Remote Visual Inspection','remote-visual-inspection.html']
 ];
 const clean=s=>(s||'').replace(/\s+/g,' ').replace(/[›→]+$/,'').trim().toLowerCase();
 function dest(label){
  const n=clean(label);
  const item=pages.find(([title])=>clean(title)===n);
  return item?item[1]:null;
 }
 document.querySelectorAll('header a, nav a, footer a, .nav-links a, .navlinks a').forEach(a=>{
  const label=a.getAttribute('aria-label')||a.innerText||a.textContent||'';
  const target=dest(label);
  if(target && !/^tel:|^mailto:|^https?:/i.test(a.getAttribute('href')||'')) a.setAttribute('href',target);
  const href=(a.getAttribute('href')||'').split('#')[0].split('/').pop().toLowerCase();
  if(href===path || (home && href==='index.html')) a.setAttribute('aria-current','page');
 });
 document.querySelectorAll('a').forEach(a=>{
  const label=clean(a.innerText||a.textContent);
  const href=a.getAttribute('href')||'';
  if((label==='learn more'||label==='view all services'||label==='explore services') && (/^tel:/.test(href)||href.startsWith('#'))) a.setAttribute('href','capabilities.html');
  if((label==='view projects'||label==='view all projects') && href.startsWith('#')) a.setAttribute('href','projects.html');
  if((label==='get in touch'||label==='request a quote'||label==='request consultation') && href.startsWith('#')) a.setAttribute('href','contact.html');
 });
 document.querySelectorAll('a[href^="#"]').forEach(a=>{
  const id=(a.getAttribute('href')||'').slice(1);
  if(id && !document.getElementById(id) && !home) a.setAttribute('href','index.html#'+id);
 });
})();