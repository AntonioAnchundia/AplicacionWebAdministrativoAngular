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
      password: new FormControl(''),
      rol: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.authService.cargar(['animacionLogin']);
  }

  onReset(){
    try{
      const email :any = this.userEmail.value;
      this.authService.resetPassword(email);
      window.alert('Email sent, check your inbox')
      //redirect to login
      // this._router.navigateByUrl("auth/login");
    }
    catch(error){
      console.log(error)
    }
  }

  onClickLogin(){
    // this.authService.logIn(this.formLogin.value);
    // let rol = this.formLogin.get('rol')?.value;
    // if(rol == "Administrador"){
    //   this._router.navigateByUrl("admin/home");
    // }else{
    //   console.log("Entra por RRHH")
    // }

    this.authService.logIn(this.formLogin.value)

    .then(response =>{ 

      let rol = this.formLogin.get('rol')?.value;
      if(rol == "Administrador"){
        this._router.navigateByUrl("admin/home");
      }else{
        console.log("Entra por RRHH")
      }



      //Extraccion de información del formulario
      // console.log(`
      //   Email: ${this.formLogin.get('email')?.value} 
      //   Contraseña: ${this.formLogin.get('password')?.value}
      //   Rol: ${this.formLogin.get('rol')?.value}
      // `);  
      // this._router.navigateByUrl("admin/home");
    })
    .catch(error =>{
        this.mensajeError = true;
        setTimeout(()=>{
          this.mensajeError = false;
        },5000)
    });
  }



  
  /*
    1. Que en el administrador -> VALIDACION CON EL COMBO BOX 
    2. if(email == administrador) -> administrador
        if{email == recursos} -> recursos h.
  */
}
