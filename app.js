// Her iki sayfada ortak çalışan kurulum: tema, SW, footer yılı, reveal, nav.
(function () {
  // Tema toggle
  var toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      var metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = next === 'light' ? '#f5f5f5' : '#0a0a0a';
    });
  }

  // Kullanıcı manuel tema seçmediyse sistem tercihini takip et
  if (window.matchMedia && !localStorage.getItem('theme')) {
    var mql = window.matchMedia('(prefers-color-scheme: light)');
    var applySystemTheme = function (match) {
      var next = match ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      var metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = next === 'light' ? '#f5f5f5' : '#0a0a0a';
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) applySystemTheme(e.matches);
      });
    }
  }

  // Footer yılı
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }

  // Nav scroll state (yalnızca hero varsa)
  var nav = document.querySelector('.site-nav');
  var hero = document.getElementById('hero');
  if (nav && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('site-nav--scrolled', !entries[0].isIntersecting);
    }, { threshold: 0.1 }).observe(hero);
  }

  // Scroll reveal
  var els = document.querySelectorAll('[data-reveal]');
  if (els.length) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }
})();
