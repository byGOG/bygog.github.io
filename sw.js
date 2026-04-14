const CACHE = 'bygog-v1';
const STATIC = [
  '/',
  '/style.css',
  '/script.js',
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

self.addEventListener('fetch', e => {
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
  // Cache-first strateji
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
