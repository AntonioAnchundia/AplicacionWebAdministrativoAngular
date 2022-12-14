import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './pages/human-resources/human-resources.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    HumanResourcesComponent
  ],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    MatSidenavModule
  ]
})
export class HumanResourcesModule { }
