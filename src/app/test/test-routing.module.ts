import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestWithoutParamsComponent } from './test-without-params/test-without-params.component';

const routes: Routes = [
    {
        path: 'testwithout',
        component: TestWithoutParamsComponent,
    },
    {
        path: ':id',
        children: [
            {
                path: '',
                component: TestComponent,
            },
            {
                path: ':value',
                component: TestComponent,
            }
        ]

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }
