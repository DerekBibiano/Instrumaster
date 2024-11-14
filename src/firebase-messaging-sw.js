// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

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

const messaging = firebase.messaging();

// Maneja la recepción de mensajes en segundo plano
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
