// Her iki sayfada ortak çalışan kurulum: tema, SW, footer yılı, reveal, nav.
(function () {
  var translations = {
    tr: {
      'nav.projects': 'Projeler', 'nav.notes': 'Notlar',
      'hero.eyebrow': 'Merhaba, ben',
      'hero.bio': "Bursa'da yaşayan, teknoloji ve yazılımla ilgilenen; doğayı, snowboard'u ve motosiklet sürmeyi seven biri. Techno ve Anadolu rock dinler, dijital araçlar ve internet kültürüyle uğraşır.",
      'hero.platform': 'Platform', 'hero.tools': 'Araçlar', 'hero.scroll': 'Kaydır', 'contact.save': 'Rehbere ekle',
      'now.title': 'Şu Sıra',
      'now.one': 'Son günlerde aklıma gelen fikirleri ChatGPT ve Codex ile konuşup küçük, işe yarayan dijital araçlara dönüştürüyorum. Bazen kişisel sitemi yeniliyor, bazen günlük işlerimi kolaylaştıracak çözümler hazırlıyorum.',
      'now.two': 'Yeni bir cihaz ya da bilgisayar parçası ilgimi çektiğinde ayrıntılarını araştırmadan duramıyorum. Şimdilerde mobil cihazlardan bilgisayar sağlığına kadar öğrendiğim faydalı bilgileri bir araya getiriyorum.',
      'now.three': 'Kullanmadığım ürünlere yeni bir sahip bulmak için anlaşılır ilanlar hazırlıyorum. Bu sırada elimde neler olduğunu düzenliyor ve dijital envanterimi adım adım güncelliyorum.',
      'now.updated': 'Son güncelleme', 'latest.title': 'Son Eklenen Notlar', 'latest.all': 'Tüm notlar →',
      'projects.title': 'Projeler', 'projects.all': 'Tümü', 'projects.details': 'Ayrıntılar',
      'projects.count': '{count} proje gösteriliyor', 'projects.github': "GitHub'da aç", 'latest.read': 'Notu oku →', 'notes.search': 'Notlarda ara…'
    },
    en: {
      'nav.projects': 'Projects', 'nav.notes': 'Notes',
      'hero.eyebrow': "Hi, I'm",
      'hero.bio': 'Based in Bursa and interested in technology and software. I enjoy nature, snowboarding and motorcycles, listen to techno and Anatolian rock, and explore digital tools and internet culture.',
      'hero.platform': 'Platforms', 'hero.tools': 'Tools', 'hero.scroll': 'Scroll', 'contact.save': 'Add to contacts',
      'now.title': 'Currently',
      'now.one': 'Lately, I have been turning ideas discussed with ChatGPT and Codex into small, useful digital tools—sometimes refreshing my personal site, sometimes building solutions that simplify everyday tasks.',
      'now.two': 'Whenever a new device or computer component catches my attention, I dive into the details. Right now, I am collecting useful notes ranging from mobile devices to computer health.',
      'now.three': 'I prepare clear listings to help unused products find new owners. Along the way, I organize what I have and keep my digital inventory up to date.',
      'now.updated': 'Last updated', 'latest.title': 'Latest Notes', 'latest.all': 'View all notes →',
      'projects.title': 'Projects', 'projects.all': 'All', 'projects.details': 'Details',
      'projects.count': '{count} projects shown', 'projects.github': 'Open on GitHub', 'latest.read': 'Read note →', 'notes.search': 'Search notes…'
    }
  };

  var currentLanguage = localStorage.getItem('language') === 'en' ? 'en' : 'tr';
  window.siteLanguage = currentLanguage;
  window.siteText = function (key, fallback) {
    return (translations[window.siteLanguage] && translations[window.siteLanguage][key]) || fallback || key;
  };

  function applyLanguage(language) {
    window.siteLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      element.textContent = window.siteText(element.getAttribute('data-i18n'), element.textContent);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
      element.placeholder = window.siteText(element.getAttribute('data-i18n-placeholder'), element.placeholder);
    });
    document.querySelectorAll('[data-language-toggle]').forEach(function (button) {
      button.textContent = language === 'tr' ? 'EN' : 'TR';
      button.setAttribute('aria-label', language === 'tr' ? 'Switch to English' : 'Türkçeye geç');
    });
    document.dispatchEvent(new CustomEvent('site-language-change', { detail: { language: language } }));
  }

  document.querySelectorAll('[data-language-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = window.siteLanguage === 'tr' ? 'en' : 'tr';
      localStorage.setItem('language', next);
      applyLanguage(next);
    });
  });
  applyLanguage(currentLanguage);

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

  // Sayfa okuma ilerlemesi
  var progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Sayfa okuma ilerlemesi');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  progress.setAttribute('aria-valuenow', '0');
  progress.innerHTML = '<span class="reading-progress__bar"></span>';
  document.body.prepend(progress);

  var progressBar = progress.firstElementChild;
  var progressTicking = false;
  function updateReadingProgress() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    var value = Math.round(ratio * 100);
    progressBar.style.transform = 'scaleX(' + ratio + ')';
    progress.setAttribute('aria-valuenow', String(value));
    progressTicking = false;
  }
  window.addEventListener('scroll', function () {
    if (!progressTicking) {
      progressTicking = true;
      window.requestAnimationFrame(updateReadingProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateReadingProgress);
  updateReadingProgress();

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
