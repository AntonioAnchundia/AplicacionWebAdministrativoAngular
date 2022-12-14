import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Department } from '../../shared/department';
import { DepartmentService } from '../../shared/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departamentoForm : FormGroup;
  // departamento: Department = new Department();

  submitted = false;

  mode = new FormControl('over' as MatDrawerMode);
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  constructor(private _formBuilder: FormBuilder, private departmentoAPI: DepartmentService) { 
    this.departamentoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      codigoDepa: new FormControl('', Validators.required),
      numeroPersonal: new FormControl('', Validators.required),
      linkReunion: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  submitDepartemento(): void{
    // this.departmentoAPI.create(this.departamento).then(() => {
    //   console.log('Registro exitoso');
    //   this.submitted = true;
    // });
    if(this.departamentoForm.valid){
      this.departmentoAPI.create(this.departamentoForm.value);

    }
  }

  // newDepartamento(): void {
  //   this.submitted = false;
  //   this.departamento = new Department();
  // }


}
