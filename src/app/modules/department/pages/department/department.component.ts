import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Department } from '../../shared/department';
import { DepartmentService } from '../../shared/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalEliminarComponent } from '../../components/ModalEliminar/ModalEliminar.component';
import { async } from '@firebase/util';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})

export class DepartmentComponent implements OnInit {
  departamentoForm : FormGroup;
  public getScreenWidth: any;
  public getScreenHeight: any;
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  mostarSideNav: boolean = false;
  currentIndex = -1;
  departaments: Department[] = [];
  botones:boolean=false;
  displayedColumns: string[] = [ 'nombre', 'codigoDepa', 'actions']; //las columnas de la tabla
  departamento !:Department;
  newImage = '';
  newFile = '';

  constructor(private departmentoAPI: DepartmentService, private dialog: MatDialog) { 
    this.departamentoForm = new FormGroup({
      photo : new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      codigoDepa: new FormControl('', Validators.required),
      numeroPersonal: new FormControl('', Validators.required),
      linkReunion: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    this.retrieveDepartament();
  }

  //Resetea el Formulario
  resetForm(){
    this.departamentoForm.reset();
    Object.keys(this.departamentoForm.controls).forEach((key) =>{
      this.departamentoForm.controls[key].setErrors(null);
    })
  }

  //Metodo Guardar
  submitDepartemento(){
    if(this.departamentoForm.valid){
      const path = 'Departamentos'; //Nombre de la ruta de como se va a guardar en el storage
      this.departmentoAPI.create(this.newFile, path, this.departamentoForm.value);
      this.resetForm();
    }
  }

  //Apartado de en Listar
  refreshList(): void{
    this.currentIndex = -1;
    this.retrieveDepartament();
  }

  //Metodo de Recuperar datos del departamento
  retrieveDepartament(): void {
    this.departmentoAPI.getAll().snapshotChanges().pipe(
      map(change => 
        change.map(c =>
          ({
            key: c.payload.key, ...c.payload.val() })
          )
      )
    ).subscribe(data => {
      this.departaments = data;
    });
  }

  //Metodo de mandar datos a los inputs
  sectActiveDepartment(departamento: Department){
    this.botones = true;
    
    this.departamentoForm.get("nombre")?.setValue(departamento.nombre);
    this.departamentoForm.get("linkReunion")?.setValue(departamento.linkReunion);
    this.departamentoForm.get("codigoDepa")?.setValue(departamento.codigoDepa);
    this.departamentoForm.get("numeroPersonal")?.setValue(departamento.numeroPersonal);
  }

  //Metodo de eliminar 
  deleteDepartment(enterAnimationDuration: string, exitAnimationDuration: string):void{
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