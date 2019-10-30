import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstOutletComponent } from './first-outlet/first-outlet.component';


const routes: Routes = [
  {
    path: 'first',
    component: FirstOutletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletTestRoutingModule { }
