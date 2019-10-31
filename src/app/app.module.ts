import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TransferHttpModule } from '@gorniv/ngx-universal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    TransferHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
