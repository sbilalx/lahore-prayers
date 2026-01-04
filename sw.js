// WE CHANGED THE VERSION NUMBER HERE TO V3
const CACHE_NAME = 'lahore-prayers-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force this new worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Network First strategy for data, Cache fallback
      return fetch(event.request).catch(() => cachedResponse);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log("Removing old cache", key);
          return caches.delete(key);
        }
      }));
    })
  );
});
