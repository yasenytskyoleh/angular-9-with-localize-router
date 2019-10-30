import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { TestWithoutParamsComponent } from './test-without-params/test-without-params.component';



@NgModule({
  declarations: [TestComponent, TestWithoutParamsComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
