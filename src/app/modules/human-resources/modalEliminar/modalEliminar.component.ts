import { Component, OnInit, Output, EventEmitter, Input, ViewChild,  Inject  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HumanResources } from '../shared/human-resources';
import { HumanResourcesService } from '../shared/human-resources.service';
import { MatTableDataSource } from '@angular/material/table';
import { HumanResourcesComponent } from '../pages/human-resources/human-resources.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modalEliminar',
  templateUrl: './modalEliminar.component.html',
  styleUrls: ['./modalEliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private dialogRef: MatDialogRef<ModalEliminarComponent>, private humanAPI: HumanResourcesService, @Inject(MAT_DIALOG_DATA) public key: string) { }



  @Input() humanresources?: HumanResources;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial!: HumanResources ;
  currentIndex = -1;
  message = '';

human?: HumanResources;
  @ViewChild(HumanResourcesComponent) child !: HumanResourcesComponent;

  humanForm!: FormGroup;

  mostrar(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
  }

  deleteTutorial(): void {
    if (this.key) {
      this.humanAPI.eliminarHumano(this.key)
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