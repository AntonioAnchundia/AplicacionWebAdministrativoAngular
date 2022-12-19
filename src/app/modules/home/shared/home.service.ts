import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private auth: Auth, private afAuth: AngularFireAuth,private router: Router) { }

  logout(){
    this.auth.signOut();
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(["auth/login"]);
    })
  }

}
