import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { UniversityComponent } from './pages/university/university.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { UniversidadService } from './shared/universidad.service';


@NgModule({
  declarations: [
    UniversityComponent
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule

    
  ],
  providers:[UniversidadService]
})
export class UniversityModule { }
