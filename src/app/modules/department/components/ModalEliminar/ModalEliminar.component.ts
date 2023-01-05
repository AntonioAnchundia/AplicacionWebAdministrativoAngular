// import { Component, OnInit } from '@angular/core';
// import { DepartmentService } from '../../shared/department.service';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-ModalEliminar',
//   templateUrl: './ModalEliminar.component.html',
//   styleUrls: ['./ModalEliminar.component.css']
// })
// export class ModalEliminarComponent implements OnInit {

//   constructor(private dialogRef: MatDialogRef<ModalEliminarComponent>, private departmentoAPI: DepartmentService) { }

//   ngOnInit() {
//   }

//   cancelar(){
//     this.dialogRef.close();
//   }

//   deleteTutorial(){}

// }


import { Component, OnInit, Output, EventEmitter, Input, ViewChild, Inject } from '@angular/core';
import { DepartmentService } from '../../shared/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../shared/department';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ModalEliminar',
  templateUrl: './ModalEliminar.component.html',
  styleUrls: ['./ModalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalEliminarComponent>, private departmentoAPI: DepartmentService, @Inject(MAT_DIALOG_DATA) public key: string) { }
  message = '';

  @Input() departamento?: Department;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial!: Department ;
  currentIndex = -1;

  departForm!: FormGroup;
  tutorials?: Department[];

  deleteTutorial(): void {
    if (this.key) {
      this.departmentoAPI.delete(this.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }
}