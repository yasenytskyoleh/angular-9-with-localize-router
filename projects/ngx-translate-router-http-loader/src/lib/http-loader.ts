import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { Location } from '@angular/common';
import { LocalizeParser, LocalizeRouterSettings } from 'projects/ngx-translate-router/src/public_api';

/**
 * Config interface
 */
export interface ILocalizeRouterParserConfig {
  locales: Array<string>;
  prefix?: string;
  escapePrefix?: string;
}

export class LocalizeRouterHttpLoader extends LocalizeParser {
  constructor(
    translate: TranslateService,
    location: Location,
    settings: LocalizeRouterSettings,
    private http: HttpClient,
    private path: string = 'assets/locales.json'
    ) {
    super(translate, location, settings);
  }

  load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      this.http.get(`${this.path}`)
        .subscribe((data: ILocalizeRouterParserConfig) => {
          this.locales = data.locales;
          this.prefix = data.prefix || '';
          this.escapePrefix = data.escapePrefix || '';
          this.init(routes).then(resolve);
        });
    });
  }
}
