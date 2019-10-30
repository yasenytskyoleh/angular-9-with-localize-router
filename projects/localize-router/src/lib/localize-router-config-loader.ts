import { ROUTES } from '@angular/router';
import {
  SystemJsNgModuleLoader, NgModuleFactory, Injector,
  SystemJsNgModuleLoaderConfig, Optional, Compiler, Injectable, Inject, forwardRef
} from '@angular/core';
import { LocalizeParser } from './localize-router.parser';


@Injectable()
export class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {

  constructor(@Inject(forwardRef(() => LocalizeParser)) private localize: LocalizeParser,
    compiler: Compiler,
    @Optional() config?: SystemJsNgModuleLoaderConfig) {
    super(compiler, config);
  }

  load(path: string): Promise<NgModuleFactory<any>> {
    console.log(path);
    return super.load(path).then((factory: NgModuleFactory<any>) => {
      return {
        moduleType: factory.moduleType,
        create: (parentInjector: Injector) => {
          const module = factory.create(parentInjector);
          const getMethod = module.injector.get.bind(module.injector);

          module.injector.get = (token: any, notFoundValue: any) => {
            const getResult = getMethod(token, notFoundValue);

            if (token === ROUTES) {
              // translate lazy routes
              return this.localize.initChildRoutes([].concat(...getResult));
            } else {
              return getResult;
            }
          };
          console.log(module);
          return module;
        }
      };
    });
  }
}
