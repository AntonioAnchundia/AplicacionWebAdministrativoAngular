import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologicalRoutingModule } from './technological-routing.module';
import { TechnologicalComponent } from './pages/technological/technological.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    TechnologicalComponent
  ],
  imports: [
    CommonModule,
    TechnologicalRoutingModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule
  ]
})
export class TechnologicalModule { }
