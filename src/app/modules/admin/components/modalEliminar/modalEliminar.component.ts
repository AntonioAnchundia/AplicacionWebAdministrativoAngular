import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministradorService } from '../../shared/administrador.service';

@Component({
  selector: 'app-modalEliminar',
  templateUrl: './modalEliminar.component.html',
  styleUrls: ['./modalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ModalEliminarComponent>, private adminAPI: AdministradorService, @Inject(MAT_DIALOG_DATA) public key: string) { }
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  ngOnInit() { }

  //Metodo de Eliminar
  deleteTutorial(): void {
    if (this.key) {
      this.adminAPI.delete(this.key)
        .then(() => {
          this.refreshList.emit();
          this.dialogRef.close();
        })
        .catch(err => console.log(err));
    }
  }

  //Metodo de cancelar
  cancelar(){
    this.dialogRef.close();
  }
}