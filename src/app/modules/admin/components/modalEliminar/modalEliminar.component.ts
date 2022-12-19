import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Administrador } from '../../shared/administrador';
import { AdministradorService } from '../../shared/administrador.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminComponent} from '../../pages/admin/admin.component'
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modalEliminar',
  templateUrl: './modalEliminar.component.html',
  styleUrls: ['./modalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private dialogRef: MatDialogRef<ModalEliminarComponent>, private adminAPI: AdministradorService) { }
  // @Input() administrador?: Administrador; PADRE AL HIJO
    // var id = actRoute.snapshot.paramMap.get('id');
  // @Output() refreshList: EventEmitter<any> = new EventEmitter();
  // message = '';


  @Input() administrador?: Administrador;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial!: Administrador ;
  currentIndex = -1;

  @ViewChild(AdminComponent) child !: AdminComponent;

  adminForm!: FormGroup;
  tutorials?: Administrador[];

  mostrar(){
    // console.log(this.adminForm.get("key")?.setValue());
    // console.log(this.child.sectActiveAdmin(admin))
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
  }

  deleteTutorial(): void {
    // console.log(admins);
    // if (this.currentTutorial.key) {
    //   this.adminAPI.delete(this.currentTutorial.key)
    //     .then(() => {
    //       this.refreshList.emit();
    //       this.message = 'The tutorial was updated successfully!';
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }
  
  
}