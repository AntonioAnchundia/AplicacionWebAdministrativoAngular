import { Component, HostListener, OnInit, EventEmitter ,Output,ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { windowTime } from 'rxjs';
import { Administrador } from '../../shared/administrador';
import { AdministradorService } from '../../shared/administrador.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';


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
  adminForm : FormGroup;
  admins?: Administrador[] = [{nombre: '', apellido: '', correo: ''}];
  currentAdmin?: Administrador;
  currentIndex = -1;
  message = '';

  constructor(private _formBuilder: FormBuilder, private adminAPI: AdministradorService) {
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
  }
  
  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.retrieveAdmins();

    this.currentAdmin = { ...this.administrador};
  }

  // Reset form
  resetForm(){
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
    this.currentAdmin = undefined;
    this.currentIndex = -1;
    this.retrieveAdmins();
  }

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

  sectActiveAdmin(admin: Administrador, index: number): void {
    this.currentAdmin = admin;
    this.currentIndex = index;

    console.log("estoy seleccionando" + index);
    
  }

  //delete
  deleteAdmin():void{
    if(this.currentAdmin?.key){
      this.adminAPI.Delete(this.currentAdmin.key)
      .then(() => {
        this.refreshList1.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateAdmin():void{
    const data = {
      nombre: this.currentAdmin?.nombre,
      apellido: this.currentAdmin?.apellido,
      cedula: this.currentAdmin?.cedula,
      correo: this.currentAdmin?.correo,
      telefono: this.currentAdmin?.telefono,
      direccion: this.currentAdmin?.direccion,
      contraseña: this.currentAdmin?.contraseña,
      repetirContraseña: this.currentAdmin?.repetirContraseña,
    };

    if(this.currentAdmin?.key) {
      this.adminAPI.update(this.currentAdmin.key, data)
        .then(() => this.message = 'Actualización exitosa')
        .catch(err => console.log(err));
    }
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  }

  displayedColumns: string[] = [ 'name', 'correo', 'actions'];
  dataSource = new MatTableDataSource<any>(this.admins);
}