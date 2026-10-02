// Uncharted Ventures — interactions
(function(){
  const nav = document.querySelector('.nav');
  const onScroll = () => { if(nav) nav.classList.toggle('solid', window.scrollY > 24); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    const setMenu = (open) => {
      links.classList.toggle('open', open);
      toggle.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    window.addEventListener('keydown', (e) => { if(e.key === 'Escape') setMenu(false); });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const y = document.querySelector('[data-year]');
  if(y) y.textContent = new Date().getFullYear();

  // Contact form — submit in-page (no third-party redirect), land on branded /thanks
  const form = document.querySelector('#contactForm');
  if(form){
    const btn = form.querySelector('button[type=submit]');
    const btnHTML = btn ? btn.innerHTML : '';
    const note = form.querySelector('.form-note');
    const say = (msg, ok) => { if(note){ note.textContent = msg; note.className = 'form-note' + (ok ? ' ok' : ' err'); } };
    const configured = /formspree\.io\/f\/[a-zA-Z]/.test(form.action) && !/your-form-id/.test(form.action);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if(!configured){
        say('Form delivery is being set up. In the meantime, please email us directly at info@uncharted.ventures.', false);
        return;
      }
      if(btn){ btn.disabled = true; btn.innerHTML = 'Sending…'; }
      say('', true);
      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          window.location.href = 'thanks.html';
          return;
        }
        const data = await res.json().catch(() => ({}));
        const m = data && data.errors && data.errors.length ? data.errors.map(x => x.message).join(' ') : 'Something went wrong sending your message.';
        say(m + ' You can also email us directly at info@uncharted.ventures.', false);
      }catch(err){
        say('Network error. Please email us directly at info@uncharted.ventures.', false);
      }finally{
        if(btn){ btn.disabled = false; btn.innerHTML = btnHTML; }
      }
    });
  }
})();
