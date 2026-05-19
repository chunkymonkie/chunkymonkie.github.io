// andrxhh — responsive nav: injects a hamburger button into every topbar and
// toggles the existing .nav into a mobile dropdown. Pure progressive enhancement.
(function () {
  function init() {
    const bar = document.querySelector('.topbar-inner');
    if (!bar) return;
    const nav = bar.querySelector('.nav');
    if (!nav) return;

    // build the button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'site-nav');
    btn.innerHTML = '<span></span><span></span><span></span>';
    bar.appendChild(btn);

    // give the nav an id for aria-controls
    if (!nav.id) nav.id = 'site-nav';

    function setOpen(open) {
      nav.classList.toggle('open', open);
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

    // close after clicking any link (mobile UX)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });

    // close on resize back to desktop
    let lastWide = window.matchMedia('(min-width: 641px)').matches;
    window.addEventListener('resize', () => {
      const wide = window.matchMedia('(min-width: 641px)').matches;
      if (wide && !lastWide) setOpen(false);
      lastWide = wide;
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
