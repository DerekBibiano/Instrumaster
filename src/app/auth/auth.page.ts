
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessagingService } from '../services/messaging.service';

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
 
   constructor(private authService: AuthService, private router: Router, private messagingService:MessagingService) {}
 
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
