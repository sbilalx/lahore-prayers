const CACHE_NAME = 'lahore-prayers-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// 1. Install Service Worker & Cache Files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force this new worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Serve from Cache, Fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Network First strategy (try to get fresh data, fall back to cache if offline)
      return fetch(event.request).catch(() => cachedResponse);
    })
  );
});

// 3. Clean up old caches (Delete V1, V2, V3, etc.)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
