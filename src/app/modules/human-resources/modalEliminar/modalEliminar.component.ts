import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HumanResources } from '../shared/human-resources';
import { HumanResourcesService } from '../shared/human-resources.service';
import { MatTableDataSource } from '@angular/material/table';
import { HumanResourcesComponent } from '../pages/human-resources/human-resources.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modalEliminar',
  templateUrl: './modalEliminar.component.html',
  styleUrls: ['./modalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private dialogRef: MatDialogRef<ModalEliminarComponent>, private humanAPI: HumanResourcesService) { }



  @Input() humanresources?: HumanResources;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial!: HumanResources ;
  currentIndex = -1;

human?: HumanResources;
  @ViewChild(HumanResourcesComponent) child !: HumanResourcesComponent;

  humanForm!: FormGroup;
  //tutorials?: HumanResources[];

  mostrar(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
  }

  deleteTutorial(): void {
    // console.log(humans);
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