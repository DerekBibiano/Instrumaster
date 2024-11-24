// Nombre del caché
const CACHE_NAME = 'instrumaster-cache-v1';

// Archivos a cachear
const FILES_TO_CACHE = [
 '/'
];

// Evento de instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("se registro el cache bien");
      return cache.addAll(FILES_TO_CACHE);
    }).catch((error) => {
      console.error('Error al agregar archivos al caché:', error);
    })
  );
  self.skipWaiting();
});

// Evento de activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Elimina cachés antiguas
          }
        })
      );
    })
  );
  self.clients.claim(); // Controla todas las páginas abiertas sin recargar
});

// Intercepción de fetch para servir desde caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
