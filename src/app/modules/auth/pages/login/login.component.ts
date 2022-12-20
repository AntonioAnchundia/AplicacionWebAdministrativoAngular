import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  userEmail = new FormControl('');

  formLogin : FormGroup;
  // error : string="CORREO O CONTRASEÑA NO VALIDAS";
  mensajeError: boolean=false;

  constructor(private authService: AuthService, private _router: Router) {
    this.formLogin = new FormGroup({

      // Validaciones
      email: new FormControl('',Validators.email),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.authService.cargar(['animacionLogin']);


    // this.authService.UserLogueado();
  }

  onReset(){
    try{
      const email :any = this.userEmail.value;
      this.authService.resetPassword(email);
      window.alert('Email sent, check your inbox')
      //redirect to login
      this._router.navigateByUrl("auth/login");
    }
    catch(error){
      console.log(error)
    }
  }

  onClickLogin(){
    this.authService.logIn(this.formLogin.value)
    .then(response =>{ 
      console.log(response);
      this._router.navigateByUrl("admin/home");
      
    })
    .catch(error =>{
        this.mensajeError = true;
        setTimeout(()=>{
          this.mensajeError = false;
        },5000)
    });
  }


  // onClickLogin(){
  //   this.authService.logIn(this.formLogin.value);
  //   this._router.navigateByUrl("admin/home");
  //   // this.authService.setToken()
  // }

}
