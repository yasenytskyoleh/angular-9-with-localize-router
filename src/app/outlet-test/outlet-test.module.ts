import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletTestRoutingModule } from './outlet-test-routing.module';
import { FirstOutletComponent } from './first-outlet/first-outlet.component';


@NgModule({
  declarations: [FirstOutletComponent],
  imports: [
    CommonModule,
    OutletTestRoutingModule
  ]
})
export class OutletTestModule { }
