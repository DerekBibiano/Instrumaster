import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1), // Toma solo el primer valor de autenticación
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Redirige a la página de autenticación si el usuario no está autenticado
          this.router.navigate(['/auth']);
          return false;
        }
        return true;
      })
    );
  }
}
