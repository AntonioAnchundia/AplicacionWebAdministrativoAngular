import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../shared/department.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ModalEliminar',
  templateUrl: './ModalEliminar.component.html',
  styleUrls: ['./ModalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalEliminarComponent>, private departmentoAPI: DepartmentService) { }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }

  deleteTutorial(){}

}
