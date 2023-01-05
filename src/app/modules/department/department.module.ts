import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './pages/department/department.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../../../environments/environment';
import { DepartmentService } from './shared/department.service';

import {MatDialogModule} from '@angular/material/dialog';

import { AngularFireStorageModule } from '@angular/fire/compat/storage'; //Librería para guardar imagenes

@NgModule({
  declarations: [
    DepartmentComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MatSidenavModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatDialogModule,

    AngularFireStorageModule,

  ],
  providers:[DepartmentService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class DepartmentModule { }
