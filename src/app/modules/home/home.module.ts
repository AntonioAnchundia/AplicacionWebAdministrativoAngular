import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { homeRoutes } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule.forChild(homeRoutes), 
    SharedModule,
  ],
})
export class HomeModule { }
