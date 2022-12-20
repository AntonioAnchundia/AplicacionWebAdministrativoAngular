import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './pages/human-resources/human-resources.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

import { HumanResourcesService } from './shared/human-resources.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../../../environments/environment';

import { Firestore} from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    HumanResourcesComponent
  ],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,

    
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,

    MatDialogModule,
  ],
  providers:[HumanResourcesService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HumanResourcesModule { }
