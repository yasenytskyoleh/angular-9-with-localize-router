import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from '../../modules/localize-router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localizeService: LocalizeRouterService,
    private router: Router
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
