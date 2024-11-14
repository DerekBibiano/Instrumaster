
// Nombre del caché
const CACHE_NAME = 'instrumaster-cache-v1';

// Archivos a cachear
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/firebase-messaging-sw.js'
];

// Evento de instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    }).catch(error => {
      console.error('Falló la caché en la instalación:', error);
    })
  );
  self.skipWaiting(); // Activa inmediatamente el Service Worker después de la instalación
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

// Importación de Firebase para manejar las notificaciones push
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWsVqfO9xSTog_eiBhJthA2A5HL3mpuYk",
  authDomain: "instrumaster-2c4e6.firebaseapp.com",
  projectId: "instrumaster-2c4e6",
  storageBucket: "instrumaster-2c4e6.appspot.com",
  messagingSenderId: "911820236695",
  appId: "1:911820236695:web:7bc98b50863e38ef3486d2",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicialización del servicio de mensajería
const messaging = firebase.messaging();

// Manejo de notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});