import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async register(email: string, password: string){
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login (email: string, password: string){
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // Si hay un usuario, devuelve true; si no, false
    );
  }

  async logout(){
    try{
      await this.afAuth.signOut();
    }catch (error){
      console.log("algo salio mal");
      console.log(error);
      throw error;
    }
  }

}
