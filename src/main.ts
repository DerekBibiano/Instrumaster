import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { getMessaging, getToken } from "firebase/messaging"; // Asegúrate de tener Firebase configurado
import { initializeApp } from "firebase/app";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Inicializa Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWsVqfO9xSTog_eiBhJthA2A5HL3mpuYk",
    authDomain: "instrumaster-2c4e6.firebaseapp.com",
    projectId: "instrumaster-2c4e6",
    storageBucket: "instrumaster-2c4e6.appspot.com",
    messagingSenderId: "911820236695",
    appId: "1:911820236695:web:7bc98b50863e38ef3486d2",
    measurementId: "G-CR26DELB1Y"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(async (registration) => {
      console.log('Service Worker registrado:', registration.scope);

      // Asegura que el Service Worker esté activo y listo
      const readyRegistration = await navigator.serviceWorker.ready;
      if (readyRegistration) {
        await obtenerTokenDeNotificacion(readyRegistration);
      }
    })
    .catch((error) => {
      console.log('Error al registrar el Service Worker:', error);
    });
}

async function obtenerTokenDeNotificacion(serviceWorkerRegistration: ServiceWorkerRegistration) {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'TU_VAPID_KEY', // Reemplaza con tu clave pública VAPID
      serviceWorkerRegistration
    });
    console.log('Token obtenido:', token);
  } catch (error) {
    console.error('Error al obtener el token de notificación:', error);
  }
}
