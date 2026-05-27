const CACHE = 'ai-mastery-v5';
const FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/modules/m1a.html',
  '/modules/m1b.html',
  '/modules/m2a.html',
  '/modules/m2b.html',
  '/modules/m3a.html',
  '/modules/write-game.js',
  '/modules/m3b.html',
  '/modules/m4a.html',
  '/modules/m4b.html',
  '/modules/m5a.html',
  '/modules/m5b.html',
  '/modules/m6a.html',
  '/modules/m6b.html',
  '/modules/m7a.html',
  '/modules/m7b.html',
  '/modules/claude.html',
  '/modules/m8a.html',
  '/modules/m8b.html',
  '/modules/m9a.html',
  '/modules/m9b.html',
  '/modules/m10a.html',
  '/modules/m10b.html',
  '/modules/m11a.html',
  '/modules/m11b.html',
  '/modules/m12a.html',
  '/modules/m12b.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
