import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { LocalizeRouterModule, LocalizeParser, ManualParserLoader, LocalizeRouterSettings } from './shared/modules/localize-router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule)
  },
  {
    path: 'auth',
    outlet: 'modal',
    data: {
      skipRouteLocalization: true
    },
    loadChildren: () => import('./outlet-test/outlet-test.module').then(m => m.OutletTestModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    LocalizeRouterModule.forRoot(routes,
      {
        parser: {
          provide: LocalizeParser,
          useFactory: (translate, location, settings) =>
            new ManualParserLoader(translate, location, { ...settings, alwaysSetPrefix: true, defaultLangFunction: () => 'ru' },
              ['en', 'ru', 'ua']),
          deps: [TranslateService, Location, LocalizeRouterSettings]
        }
      }
    ),
  ],
  exports: [RouterModule,
    LocalizeRouterModule
  ]
})
export class AppRoutingModule { }
