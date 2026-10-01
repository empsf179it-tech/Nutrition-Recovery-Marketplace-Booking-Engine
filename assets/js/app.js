
const nav=document.querySelector('.navlinks'),menu=document.querySelector('.menu'),current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
document.querySelectorAll('.navlinks a').forEach(a=>{if((a.getAttribute('href')||'').split('/').pop().toLowerCase()===current)a.classList.add('active');a.onclick=()=>nav?.classList.remove('open')});
menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.classList.toggle('open',o);menu.setAttribute('aria-expanded',String(o))});
const els=[...document.querySelectorAll('.reveal')];els.forEach((e,i)=>{if(!e.classList.contains('from-left')&&!e.classList.contains('from-right'))e.classList.add(i%2?'from-right':'from-left')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.transitionDelay=`${Math.min((els.indexOf(e.target)%4)*70,210)}ms`;e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e));
document.querySelectorAll('.slot').forEach(s=>s.onclick=()=>{document.querySelectorAll('.slot').forEach(x=>x.classList.remove('selected'));s.classList.add('selected');document.querySelectorAll('[data-selected-slot]').forEach(o=>o.textContent=`Selected: ${s.dataset.time}`)});
document.querySelectorAll('[data-demo-form]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const n=f.parentElement.querySelector('.notice');if(n){n.style.display='block';n.textContent='Message received — this demo form is ready to connect to your backend.'}f.reset()});
const hero=document.querySelector('.hero-visual');if(hero&&matchMedia('(pointer:fine)').matches){hero.onpointermove=e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,im=hero.querySelector('.hero-photo');if(im)im.style.transform=`rotate(${2+x*2}deg) translate(${x*7}px,${y*7}px)`};hero.onpointerleave=()=>{const im=hero.querySelector('.hero-photo');if(im)im.style.transform='rotate(2deg)'}}
document.querySelectorAll('.bento-card,.service,.provider,.process-card').forEach(c=>{if(!matchMedia('(pointer:fine)').matches)return;c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateX(${-y*1.8}deg) rotateY(${x*1.8}deg) translateY(-5px)`};c.onpointerleave=()=>c.style.transform=''});

/* 2026 motion layer: scroll-aware navigation, progress and pointer depth */
const pageNav=document.querySelector('.nav');
const progress=document.querySelector('.scroll-progress span');
function updateMotion(){
  const y=window.scrollY||0;
  pageNav?.classList.toggle('scrolled',y>40);
  if(progress){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?Math.min(100,y/max*100):0)+'%'}
}
window.addEventListener('scroll',updateMotion,{passive:true}); updateMotion();

if(matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.btn-primary,.nav-cta').forEach(btn=>{
    btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;btn.style.transform=`translate(${x*5}px,${y*4-2}px)`});
    btn.addEventListener('pointerleave',()=>btn.style.transform='');
  });
}

// Give sections a gentle depth response while scrolling, without locking layout.
const depthEls=[...document.querySelectorAll('.hero-visual,.glass-section .quote,.booking-card,.page-hero .container')];
const depthTick=()=>{const vh=window.innerHeight;depthEls.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=(r.top-vh*.5)/vh;el.style.setProperty('--scroll-depth',Math.max(-1,Math.min(1,p)).toFixed(3));});requestAnimationFrame(depthTick)};
requestAnimationFrame(depthTick);
