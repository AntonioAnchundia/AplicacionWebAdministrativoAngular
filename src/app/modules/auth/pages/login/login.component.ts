import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

}
