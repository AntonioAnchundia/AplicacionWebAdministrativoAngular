import { HumanResources } from '../../shared/human-resources';
import { HumanResourcesService } from '../../shared/human-resources.service';
import { Component, HostListener, OnInit, EventEmitter ,Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ModalEliminarComponent } from '../../modalEliminar/modalEliminar.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.css']
})
export class HumanResourcesComponent implements OnInit {
  @Input() humanresources?: HumanResources;
  @Output() refreshList1: EventEmitter<any> = new EventEmitter();

  public getScreenWidth: any;
  public getScreenHeight: any;
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  mostrarSideNav: boolean=false;
  botones?:boolean=false;
  humanForm: FormGroup; // Nombre del formulario a utilizarse para los datos
  humans: HumanResources[]=[]; //Vinculada con el dtaaSource -> 
  displayedColumns: string []=['name', 'correo', 'actions'];
  currentHuman!: HumanResources;
  currentIndex= -1;
  message = '';
  
  constructor(private _formBuilder: FormBuilder, private humanAPI: HumanResourcesService, private dialog: MatDialog) { 
    this.humanForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('',[Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      repetirContraseña: new FormControl('', Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.retrieveHumans();
  }

  // Reset form
  resetForm(){
    this.botones = false;
    this.humanForm.reset();
    Object.keys(this.humanForm.controls).forEach((key) =>{
      this.humanForm.controls[key].setErrors(null);
    })
  }

  // submit human
  submitHuman(){
    if(this.humanForm.valid){
      this.humanAPI.addHuman(this.humanForm.value);
      this.resetForm();
    }
  }


  // Apartado de en Listar
  refreshList(): void {
    this.currentIndex = -1;
    this.retrieveHumans();
  }

  retrieveHumans():void{
    this.humanAPI.getAll().snapshotChanges().pipe(
      map(change => 
        change.map(c => 
          ({
            key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.humans = data;
    });
  }

  //Metodo de mandar datos a los inputs
  sectActiveHuman(human: HumanResources): void {
    this.botones=true;
    this.humanForm.get("nombre")?.setValue(human.nombre);
    this.humanForm.get("apellido")?.setValue(human.apellido)
    this.humanForm.get("cedula")?.setValue(human.cedula);
    this.humanForm.get("correo")?.setValue(human.correo);
    this.humanForm.get("telefono")?.setValue(human.telefono);
    this.humanForm.get("direccion")?.setValue(human.direccion);
    this.humanForm.get("contraseña")?.setValue(human.contraseña);
    this.humanForm.get("repetirContraseña")?.setValue(human.repetirContraseña);
    return console.log(human);
  }

  //delete
  deleteHuman(enterAnimationDuration: string, exitAnimationDuration: string):void{
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

  //prueba_eliminar
  eliminarhumano(id: string){
    console.log(id);
  }




  updateHuman():void{
    const data = {
      nombre: this.currentHuman?.nombre,
      apellido: this.currentHuman?.apellido,
      cedula: this.currentHuman?.cedula,
      correo: this.currentHuman?.correo,
      telefono: this.currentHuman?.telefono,
      direccion: this.currentHuman?.direccion,
      contraseña: this.currentHuman?.contraseña,
      repetirContraseña: this.currentHuman?.repetirContraseña,
    };

    if(this.currentHuman?.key) {
      this.humanAPI.update(this.currentHuman.key, data)
        .then(() => this.message = 'Actualización exitosa')
        .catch(err => console.log(err));
    }
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostrarSideNav=true : this.mostrarSideNav=false;
  }
  
  private image: any;
  handleImage(event: any): void{
    //Extraigo la informacion de la img
    this.image = event.target.files[0];
    // console.log('IMAGE', this.image);
}
}
