const CACHE = 'bygog-v3';
const STATIC = [
  '/',
  '/style.css',
  '/script.js',
  '/app.js',
  '/profil.webp',
  '/profil-opt.jpg',
  '/manifest.json',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// posts/index.json ve posts/*.md için stale-while-revalidate
function isPostAsset(url) {
  return url.origin === self.location.origin && (
    url.pathname === '/posts/index.json' ||
    (url.pathname.startsWith('/posts/') && url.pathname.endsWith('.md'))
  );
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // API ve font isteklerini atla
  if (
    url.hostname.includes('github.com') ||
    url.hostname.includes('githubusercontent.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    return;
  }

  if (isPostAsset(url)) {
    // stale-while-revalidate: önbellekten hızlıca sun, arka planda güncelle
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const networked = fetch(e.request).then(res => {
            if (res && res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || networked;
        })
      )
    );
    return;
  }

  // Cache-first strateji
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
