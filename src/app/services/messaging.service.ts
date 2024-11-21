import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}
  
  requestPermissionAndSaveToken() {
    navigator.serviceWorker.ready
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.afMessaging.requestToken.subscribe(
              (token) => {
                if (token) {
                  console.log('Token de notificación:', token);
                  this.saveTokenToFirestore(user.uid, token);
                } else {
                  console.error('No se pudo obtener un token de notificación.');
                }
              },
              (error) => {
                console.error('Error al obtener el token:', error);
              }
            );
          } else {
            console.error('Usuario no autenticado. No se puede guardar el token.');
          }
        });
      })
      .catch((error) => {
        console.error('El Service Worker no está listo:', error);
      });
  }
  
  

  private saveTokenToFirestore(userId: string, token: string) {
    const tokensRef = this.firestore.collection('users').doc(userId).collection('tokens');
    tokensRef.doc(token).set({ token }).catch((error) => {
      console.error('Error al guardar el token en Firestore:', error);
    });
  }

  async showLocalNotification(title: string, options: NotificationOptions) {
    if (!('Notification' in window)) {
      console.error('El navegador no soporta notificaciones.');
      return;
    }

    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
      } else {
        console.error('Permiso de notificación no otorgado.');
      }
    }
  }

  // Método para generar una notificación de ejemplo
  sendTestNotification() {
    const title = 'Tenemos una cancion nueva en nuestro repertorio';
    const options: NotificationOptions = {
      body: 'Ven a darle un vistazo al repertorio',
      icon: '../../assets/icon/icon-192x192.png', // Cambia la ruta del icono si es necesario
    };
    this.showLocalNotification(title, options);
  }

}
