import { Injectable, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Administrador } from '../../admin/shared/administrador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth,  public router: Router, public ngZone: NgZone, private afAuth: AngularFireAuth) {}

  async resetPassword(email: string): Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error) {
      console.log(error);
    }
  }

  cargar( archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement("script");
      script.src = './assets/js/'+archivo+'.js';
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }

  logIn({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}