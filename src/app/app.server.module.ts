import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ServiceWorkerMockModule } from './shared/modules/service-worker-mock/service-worker.mock.module';

const fs = require('fs');

export class TranslatesServerLoaderService implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
    private transferState: TransferState,
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return  new Observable((observer) => {
      const jsonData: any = JSON.parse(
        fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8'),
      );
      const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateFactory(transferState: TransferState): TranslatesServerLoaderService {
  return new TranslatesServerLoaderService('./dist/browser/assets/i18n/', '.json', transferState);
}
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [TransferState],
      },
    }),
    ServerTransferStateModule,
    ServiceWorkerMockModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
