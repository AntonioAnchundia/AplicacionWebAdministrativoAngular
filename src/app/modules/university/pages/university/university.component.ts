import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { map, Observable, startWith } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation} from '@angular/material/stepper';
import { UniversidadService } from '../../shared/universidad.service';
import { Universidad } from '../../shared/universidad';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'], 
  encapsulation: ViewEncapsulation.None
})

export class UniversityComponent implements OnInit {
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  public getScreenWidth: any;
  public getScreenHeight: any;
  mostarSideNav: boolean = false;
  @HostListener('window:resize', ['$event'])

    /*Este son los datos quedamos por defecto */
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

    /*Form GROUP */
  universdidadForm: FormGroup;
  facultadForm: FormGroup;
  carreraForm: FormGroup;
  
  universidads: Universidad[] = [];

  public selectedUniversidad: Universidad = {key:'' , nombre_Universidad:''}
  nameCombo: string[] = ['name'];

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  }
 

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private universidadAPI: UniversidadService) {
    this.universdidadForm = new FormGroup({
      nombre_Universidad: new FormControl('', Validators.required),
      nombreCorto_Universidad:new FormControl('', ),
      correo_Universidad: new FormControl('', ),
      telefono_Universidad: new FormControl('', ),
      direccion_Universidad:new FormControl('', ),
      url_Universidad: new FormControl('', ),
      director_Universidad: new FormControl('', ),
    })
    
    this.facultadForm = new FormGroup({
      nombreFacultad: new FormControl('', Validators.required),
      correoFacultad:new FormControl('', ),
      telefonoFacultad: new FormControl('', ),
      nombreDecanoFacultad: new FormControl('', ),
      correoDecanoFacultad:new FormControl('',),
      telefonoDecanoFacultad: new FormControl('', ),
      direccionFacultad: new FormControl('', ),
    })

    this.carreraForm = new FormGroup({
      nombreCarrera: new FormControl('', Validators.required),
      CorreoCarrera: new FormControl('', ),
      telefonoCarrera: new FormControl('', ),
      nombreDirectorCarrera: new FormControl('', ),
      correoDirectorCarrera: new FormControl('',),
      telefonoDirectorCarrera: new FormControl('', ),
    })

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }


  // guardarUniversidad(){}
  resetForm(){
    this.universdidadForm.reset();
    Object.keys(this.universdidadForm.controls).forEach((key) => {
      this.universdidadForm.controls[key].setErrors(null);
    })
  }

  submitUniversidad(){
    if(this.universdidadForm.valid){
      this.universidadAPI.agregarUsuario(this.universdidadForm.value, this.facultadForm.value, this.carreraForm.value);
      this.resetForm();
    }
  }

  retrieveAdmins():void{
    this.universidadAPI.getAll().snapshotChanges().pipe(
      map(change =>
        change.map(c =>
          ({
            key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(this.universidads = data);
    });
  }
}