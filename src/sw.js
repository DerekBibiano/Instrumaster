// Nombre del caché
const CACHE_NAME = 'instrumaster-cache-v1';

// Archivos a cachear (modifica según tus necesidades)
const FILES_TO_CACHE = [
  '/',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cacheando archivos...');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((error) => {
        console.error('[Service Worker] Error al cachear archivos:', error);
      })
  );
  self.skipWaiting(); // Activa el Service Worker inmediatamente
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim(); // Controla las páginas abiertas sin recargar
});

// Intercepta las solicitudes y responde desde el caché o la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('[Service Worker] Sirviendo desde caché:', event.request.url);
          return response;
        }
        console.log('[Service Worker] Obteniendo desde la red:', event.request.url);
        return fetch(event.request);
      })
  );
});

// Manejo de notificaciones push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Notificación push recibida.');
  const data = event.data ? event.data.json() : { title: 'Nueva notificación' };

  const options = {
    body: data.body || 'Tienes una nueva notificación.',
    icon: data.icon || '/assets/icons/icon-192x192.png',
    badge: data.badge || '/assets/icons/badge-72x72.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificación', options)
  );
});

// Manejo de interacción con notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificación clickeada:', event.notification.tag);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        const client = clientList[0];
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});

// Manejo de mensajes desde la app
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Mensaje recibido:', event.data);
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting(); // Actualiza el SW inmediatamente
  }
});

// Importar scripts externos si usas Firebase
// importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');
