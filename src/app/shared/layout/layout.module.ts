import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'projects/ngx-translate-router/src/public_api';



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
