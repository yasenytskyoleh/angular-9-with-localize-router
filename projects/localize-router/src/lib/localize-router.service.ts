import { Inject, Injectable, ɵpatchComponentDefWithScope } from '@angular/core';
import {
  Router,
  NavigationStart,
  ActivatedRouteSnapshot,
  UrlSegment,
  PRIMARY_OUTLET,
  NavigationExtras
} from '@angular/router';
import { Subject } from 'rxjs';
import { pairwise, filter, tap } from 'rxjs/operators';
import { LocalizeParser } from './localize-router.parser';
import { LocalizeRouterSettings } from './localize-router.config';

/**
 * Localization service
 * modifyRoutes
 */
@Injectable()
export class LocalizeRouterService {
  routerEvents: Subject<string>;
  previousLang: string;
  constructor(
    @Inject(LocalizeParser) public parser: LocalizeParser,
    @Inject(LocalizeRouterSettings) public settings: LocalizeRouterSettings,
    @Inject(Router) private router: Router
  ) {
    this.routerEvents = new Subject<string>();
  }

  /**
   * Start up the service
   */
  init(): void {
    this.router.resetConfig(this.parser.routes);
    this.previousLang = this.parser.currentLang;
    // subscribe to router events
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        // pairwise()
      )
      .subscribe((event: NavigationStart) => {
        const currentLang = this.parser.getLocationLang(event.url) || this.parser.defaultLang;
        this.changeLanguage(currentLang);
      });
  }

  changeLanguage(lang: string): void {
    if (lang !== this.parser.currentLang) {
      const rootSnapshot: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      this.parser.mutateRouterRootRoute(lang, this.previousLang, this.router.config);
      this.parser.translateRoutes(lang)
        .pipe(
          // set new routes to router
          tap(() => console.log(this.parser.routes)),
          tap(() => this.router.resetConfig(this.parser.routes))
        )
        .subscribe(() => {
          this.previousLang = lang;
          const urlSegments = this.traverseSnapshot(rootSnapshot, true)
            .filter((path: string, i: number) => {
              return !i || path; // filter out empty paths
            });

          const navigationExtras: NavigationExtras = {
            ...rootSnapshot.queryParamMap.keys.length ? { queryParams: rootSnapshot.queryParams } : {},
            ...rootSnapshot.fragment ? { fragment: rootSnapshot.fragment } : {}
          };
          console.log(this.router.config);
          // use navigate to keep extras unchanged
          this.router.navigate(urlSegments, navigationExtras);
        });
    }
  }

  private traverseSnapshot(
    snapshot: ActivatedRouteSnapshot,
    isRoot: boolean = false
  ): any[] {
    if (isRoot) {
      if (!snapshot.firstChild) {
        return [''];
      }
      if (this.settings.alwaysSetPrefix || this.parser.currentLang !== this.parser.defaultLang) {
        return [`/${this.parser.currentLang}`, ...this.traverseSnapshot(snapshot.firstChild.firstChild)];
      } else {

        return [...this.traverseSnapshot(snapshot.firstChild.firstChild)];
      }
    }
    const urlPart = this.parseSegmentValue(snapshot);
    const outletChildren = snapshot.children
      .filter(child => child.outlet !== PRIMARY_OUTLET);
    const outlets = outletChildren
      .reduce((acc, cur) => ({
        outlets: {
          ...acc.outlets,
          [cur.outlet]: this.parseSegmentValue(cur)
        }
      }), { outlets: {} });

    const primaryChild = snapshot.children.find(child => child.outlet === PRIMARY_OUTLET);
    return [
      urlPart,
      ...outletChildren.length ? [outlets] : [],
      ...primaryChild ? this.traverseSnapshot(primaryChild) : []
    ];
  }

  private parseSegmentValue(snapshot: ActivatedRouteSnapshot): string {
    if (snapshot.routeConfig) {

      if (snapshot.routeConfig.path === '**') {
        return this.parser.translateRoute(snapshot.url
          .filter((segment: UrlSegment) => segment.path)
          .map((segment: UrlSegment) => segment.path)
          .join('/'));
      } else if (snapshot.routeConfig) {
        const subPathSegments = snapshot.routeConfig.data ?
          snapshot.routeConfig.data.localizeRouter.path.split('/') :
          snapshot.routeConfig.path.split('/');
        return subPathSegments
          .map((s: string, i: number) => s.indexOf(':') === 0 ?
            snapshot.url[i].path :
            this.parser.translateRoute(s))
          .join('/');
      } else if (snapshot.params) {
        const paramMap = snapshot.paramMap;
        return paramMap.keys.map(key =>
          this.parser.translateRoute(paramMap.get(key))
        ).toString();
      }
    }
    return '';
  }

  translateRoute(path: string | any[]): string | any[] {
    // path is null (e.g. resetting auxiliary outlet)
    if (!path) {
      return path;
    }
    if (typeof path === 'string') {
      const url = this.parser.translateRoute(path);
      return !path.indexOf('/') ? `/${this.parser.urlPrefix}${url}` : url;
    }
    // it's an array
    const
      result: any[] = [];
    (path as Array<any>).forEach((segment: any, index: number) => {
      if (typeof segment === 'string') {
        const res = this.parser.translateRoute(segment);
        if (!index && !segment.indexOf('/')) {
          result.push(`/${this.parser.urlPrefix}${res}`);

        } else {
          result.push(res);
        }
      } else {
        // translate router outlets block
        if (segment && segment.outlets) {
          const outlets: any = {};
          for (const key in segment.outlets) {
            if (segment.outlets.hasOwnProperty(key)) {
              outlets[key] = this.translateRoute(segment.outlets[key]);
            }
          }
          result.push({ ...segment, outlets });
        } else {
          result.push(segment);
        }
      }
    });
    return result;
  }

  private _routeChanged(): (eventPair: [NavigationStart, NavigationStart]) => void {
    return ([previousEvent, currentEvent]: [NavigationStart, NavigationStart]) => {
      const previousLang = this.parser.getLocationLang(previousEvent.url) || this.parser.defaultLang;
      const currentLang = this.parser.getLocationLang(currentEvent.url) || this.parser.defaultLang;
      if (currentLang !== previousLang) {
        this.previousLang = previousLang;
        // mutate router config directly to avoid getting out of sync
        this.parser.mutateRouterRootRoute(currentLang, previousLang, this.router.config);
        this.parser.translateRoutes(currentLang)
          .pipe(
            // reset routes again once they are all translated
            tap(() => this.router.resetConfig(this.parser.routes))
          )
          .subscribe(() => {
            // Fire route change event
            this.routerEvents.next(currentLang);
          });
      }
    };
  }
}
