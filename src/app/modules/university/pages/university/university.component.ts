import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { map, Observable, startWith } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation} from '@angular/material/stepper';
import { UniversidadService } from '../../shared/universidad.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'], 
  encapsulation: ViewEncapsulation.None
})

export class UniversityComponent implements OnInit {
  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  
  universdidadForm: FormGroup;
  facultadForm: FormGroup;
  carreraForm: FormGroup;
  // responsive

  
  public getScreenWidth: any;
  public getScreenHeight: any;
  mostarSideNav: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getScreenWidth <= 1169 ? this.mostarSideNav=true : this.mostarSideNav=false;
  }

  // autocomplete
  // ********************************************************************************
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private universidadAPI: UniversidadService) {
    this.universdidadForm = new FormGroup({
      nombre_Universidad: new FormControl('', Validators.required),
      nombreCorto_Universidad:new FormControl('', Validators.required),
      correo_Universidad: new FormControl('', Validators.required),
      telefono_Universidad: new FormControl('', Validators.required),
      direccion_Universidad:new FormControl('', Validators.required),
      url_Universidad: new FormControl('', Validators.required),
      director_Universidad: new FormControl('', Validators.required),
    })
    
    this.facultadForm = new FormGroup({
      nombreFacultad: new FormControl('', Validators.required),
      correoFacultad:new FormControl('', Validators.required),
      telefonoFacultad: new FormControl('', Validators.required),
      nombreDecanoFacultad: new FormControl('', Validators.required),
      correoDecanoFacultad:new FormControl('', Validators.required),
      telefonoDecanoFacultad: new FormControl('', Validators.required),
      direccionFacultad: new FormControl('', Validators.required),
    })

    this.carreraForm = new FormGroup({
      nombreCarrera: new FormControl('', Validators.required),
      CorreoCarrera: new FormControl('', Validators.required),
      telefonoCarrera: new FormControl('', Validators.required),
      nombreDirectorCarrera: new FormControl('', Validators.required),
      correoDirectorCarrera: new FormControl('', Validators.required),
      telefonoDirectorCarrera: new FormControl('', Validators.required),
    })

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
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

  
}
