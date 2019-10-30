import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '../modules/localize-router';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    RouterModule,
    TranslateModule
  ],
  exports: [HeaderComponent]
})
export class LayoutModule { }
