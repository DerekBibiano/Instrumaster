
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MessagingService } from '../services/messaging.service';
import { PrivacyPolicyModalComponent } from '../privacy-policy-modal/privacy-policy-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
   
  // Variables para almacenar email y password del formulario
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

   // Variable para manejar el modo de autenticación ('login' o 'register')
   authMode: string = 'login'; // Por defecto, en el modo de login
   errorMessage: string = ''; // Para mostrar errores
   acceptPrivacyPolicy: boolean = false;
   isRegistering: boolean = false;  // Controla la vista entre inicio de sesión y registro

   constructor(private authService: AuthService,
    private router: Router, 
    private messagingService:MessagingService,
    private modalController: ModalController  
  ) {}

  toggleForm() {
    // Cambiar el valor de authMode entre 'login' y 'register'
    this.authMode = this.authMode === 'login' ? 'register' : 'login';
  }

  async showPrivacyPolicy() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyModalComponent,
      cssClass: 'custom-modal-class'
    });
    await modal.present();
  }

   // Método para iniciar sesión
   async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.messagingService.requestPermissionAndSaveToken();
      this.router.navigateByUrl('/tabs');
    } catch (error) {
      if (error instanceof Error) {
        console.log(this.errorMessage = 'Error al iniciar sesión: ' + error.message);
      } else {
        this.errorMessage = 'Error desconocido al iniciar sesión';
      }
    }
  }
  
  async register() {
    if (!this.acceptPrivacyPolicy) {
      console.error('Debes aceptar el aviso de privacidad');
      return;
    }
    if(this.password === this.passwordConfirm){
      try {
        await this.authService.register(this.email, this.password);
        this.messagingService.requestPermissionAndSaveToken();
        this.router.navigateByUrl('/tabs');
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = 'Error al registrarse: ' + error.message;
        } else {
          this.errorMessage = 'Error desconocido al registrarse';
        }
      }
    }
  }
  
}
