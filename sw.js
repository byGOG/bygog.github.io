const CACHE = 'bygog-v3';
const STATIC = [
  '/',
  '/index.html',
  '/notlar.html',
  '/404.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/profil.webp',
  '/profil-opt.jpg',
  '/icon-180.png',
  '/icon-192.png',
  '/icon-512.png',
  '/posts/index.json',
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

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  if (
    url.hostname.includes('github.com') ||
    url.hostname.includes('githubusercontent.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('jsdelivr.net') ||
    url.hostname.includes('web3forms.com')
  ) {
    return;
  }

  // Markdown postları için stale-while-revalidate
  if (url.pathname.startsWith('/posts/') && url.pathname.endsWith('.md')) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const network = fetch(e.request).then(res => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Diğer her şey: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
