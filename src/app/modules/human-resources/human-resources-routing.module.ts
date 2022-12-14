import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanResourcesComponent } from './pages/human-resources/human-resources.component';

const routes: Routes = [
  { path: '', component: HumanResourcesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
