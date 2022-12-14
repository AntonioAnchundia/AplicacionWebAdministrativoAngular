import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

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
