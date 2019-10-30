import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'projects/ngx-translate-router/src/public_api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localizeService: LocalizeRouterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }
  changeLang(lang: string) {
    this.localizeService.changeLanguage(lang);
  }
  toModal() {
    this.router.navigate(['/', { outlets: { modal: ['auth'] } }]);
  }
}
