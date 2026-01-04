const CACHE_NAME = 'lahore-prayers-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html'
];

// 1. Install Service Worker & Cache Index
self.addEventListener('install', (event) => {
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
      // Return cached file if found, otherwise go to network
      return cachedResponse || fetch(event.request);
    })
  );
});

// 3. Clean up old caches (optional but good practice)
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