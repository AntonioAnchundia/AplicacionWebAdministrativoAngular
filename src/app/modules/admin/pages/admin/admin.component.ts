import { Administrador } from '../../shared/administrador';
import { AdministradorService } from '../../shared/administrador.service';
import { Component, HostListener, OnInit, EventEmitter ,Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ModalEliminarComponent } from '../../components/modalEliminar/modalEliminar.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{
  @Input() administrador?: Administrador;
  @Output() refreshList1: EventEmitter<any> = new EventEmitter();
  public getScreenWidth: any;
  public getScreenHeight: any;
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  mostarSideNav: boolean = false;
  botones:boolean=false;
  adminForm : FormGroup; //Este es para el formulario
  admins: Administrador[] = []; //vinculado con el dataSource -> extracción de datos
  displayedColumns: string[] = [ 'name', 'correo', 'actions']; //las columnas de la tabla
  currentAdmin!: Administrador;
  currentIndex = -1;
  message = '';

  constructor(private adminAPI: AdministradorService, private dialog: MatDialog) {
    this.adminForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      repetirContraseña: new FormControl('', Validators.required),
    });
    // var id = this.actRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.retrieveAdmins();
  }

  // Reset form
  resetForm(){
    this.botones = false;
    this.adminForm.reset();
    Object.keys(this.adminForm.controls).forEach((key) =>{
      this.adminForm.controls[key].setErrors(null);
    })
  }

  // submit admin
  submitAdmin(){
    if(this.adminForm.valid){
      this.adminAPI.addAdmin(this.adminForm.value);
      this.resetForm();
    }
  }

  // Apartado de en Listar
  refreshList(): void {
    this.currentIndex = -1;
    this.retrieveAdmins();
  }

  // Metodo de Recuperar datos del administrador
  retrieveAdmins():void{
    this.adminAPI.getAll().snapshotChanges().pipe(
      map(change =>
        change.map(c =>
          ({
            key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.admins = data;
    });
  }

  //Metodo de mandar datos a los inputs
  sectActiveAdmin(admin: Administrador){
    this.botones=true;
    this.adminForm.get("nombre")?.setValue(admin.nombre);
    this.adminForm.get("apellido")?.setValue(admin.apellido)
    this.adminForm.get("cedula")?.setValue(admin.cedula);
    this.adminForm.get("correo")?.setValue(admin.correo);
    this.adminForm.get("telefono")?.setValue(admin.telefono);
    this.adminForm.get("direccion")?.setValue(admin.direccion);
    this.adminForm.get("contraseña")?.setValue(admin.contraseña);
    this.adminForm.get("repetirContraseña")?.setValue(admin.repetirContraseña);
    return console.log(admin);
  }

  //Metodo de Eliminar Administrador
  deleteAdmin(enterAnimationDuration: string, exitAnimationDuration: string):void{
    this.dialog.open(ModalEliminarComponent, {
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: "555px",
      height: "auto",
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }


  //Metodo de actualizar administrador
  updateAdmin(){
    console.log(this.adminForm.value)
    // console.log(this.adminForm.get("nombre")?.setValue());

    // let zxc = this.admins;
    // var id = this.sectActiveAdmin(this.administrador.get);
    // this.adminAPI.UpdateAdmin(id, this.adminForm.value);
    // console.log("id: "+ id);

    //key - apellido - cedula ...

    //Obtengo todas las Key de las BD
    // for(let i = 0; i < this.admins.length; i++){
    //   console.log(this.admins[i].nombre);
    //   // console.log(this.sectActiveAdmin(this.admins[i])); NO FUNCIONA
    // }



    //OBTENER LA KEY SELECCIONADA
      //

    // let[key,] = this.admins;
    // console.log(key);
  // console.log(this.adminForm.get("key")?.setValue(this.currentAdmin.key));


    // const data = {
    //   nombre: this.currentAdmin?.nombre,
    //   apellido: this.currentAdmin?.apellido,
    //   cedula: this.currentAdmin?.cedula,
    //   correo: this.currentAdmin?.correo,
    //   telefono: this.currentAdmin?.telefono,
    //   direccion: this.currentAdmin?.direccion,
    //   contraseña: this.currentAdmin?.contraseña,
    //   repetirContraseña: this.currentAdmin?.repetirContraseña,
    // };

    // if(this.currentAdmin?.key) {
    //   this.adminAPI.update(this.currentAdmin.key, data)
    //     .then(() => this.message = 'Actualización exitosa')
    //     .catch(err => console.log(err));
    // }

  }

  //Metodo de cambio de tamaño
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  }

}