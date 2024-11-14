import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('Token de notificación obtenido:', token);
      },
      (error) => {
        console.error('Error al obtener el token de notificación', error);
      }
    );
  }
}
