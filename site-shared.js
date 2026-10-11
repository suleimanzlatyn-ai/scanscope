/* Shared accessible navigation behaviour for ScanScope multi-page pages. */
(function(){
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('header .navlinks a,header .nav-links a').forEach(function(a){
    const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    const target=href||'index.html';
    if(target===path || ((path===''||path==='index.html') && target==='index.html')) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  const menu=document.querySelector('header .menu');
  const nav=document.querySelector('header .navlinks,header .nav-links');
  if(!menu||!nav)return;
  function setOpen(open){
    nav.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    if(menu.tagName==='BUTTON') menu.textContent=open?'×':'☰';
  }
  menu.addEventListener('click',function(e){e.preventDefault();setOpen(!nav.classList.contains('open'));});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setOpen(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
  document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!nav.contains(e.target))setOpen(false);});
  window.addEventListener('resize',function(){if(window.innerWidth>900)setOpen(false);});
})();