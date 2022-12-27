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
  newImage = '';
  newFile = '';
  currentIndex = -1;
  message = '';

  constructor(private adminAPI: AdministradorService, private dialog: MatDialog) {
    this.adminForm = new FormGroup({
      photo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      repetirContraseña: new FormControl('', Validators.required),
      key: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.retrieveAdmins();
  }

  //Refrescar Página
  locationreload() {
    location.reload();      
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
    const path = 'Administrador';
    if(this.adminForm.valid){
      this.adminAPI.create(this.newFile, path, this.adminForm.value);
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
    this.adminForm.get("correo")?.disable();
    this.adminForm.get("telefono")?.setValue(admin.telefono);
    this.adminForm.get("direccion")?.setValue(admin.direccion);
    this.adminForm.get("contraseña")?.setValue(admin.contraseña);
    this.adminForm.get("contraseña")?.disable();
    this.adminForm.get("repetirContraseña")?.setValue(admin.contraseña);
    this.adminForm.get("repetirContraseña")?.disable();
    this.adminForm.get("key")?.setValue(admin.key);
  }

  //Metodo de Eliminar Administrador
  deleteAdmin(enterAnimationDuration: string, exitAnimationDuration: string, key: string):void{
    this.dialog.open(ModalEliminarComponent, {
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      width: "555px",
      height: "auto",
      enterAnimationDuration,
      exitAnimationDuration,
      data: key,
    })
  }


  //Metodo de actualizar administrador
  updateAdmin(){
    const data = {
      nombre: this.adminForm.get("nombre")?.value,
      apellido: this.adminForm.get("apellido")?.value,
      cedula: this.adminForm.get("cedula")?.value,
      correo: this.adminForm.get("correo")?.value,
      telefono: this.adminForm.get("telefono")?.value,
      direccion: this.adminForm.get("direccion")?.value,
      contraseña: this.adminForm.get("contraseña")?.value,
      repetirContraseña: this.adminForm.get("repetirContraseña")?.value
    };
    const key = this.adminForm.get("key")?.value;

    if(key){
      this.adminAPI.update(key, data)
      .then(() => this.message = 'Actualización exitosa')
      .catch(err => console.log(err));
      this.resetForm();
    }
  
  }

  //Metodo de cambio de tamaño
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  }
  //CARGAR IMAGEN EN EL IMPUT
  async newUploadFile(event: any){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target?.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}