import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'localize-test';
  constructor(
    private swUpdate: SwUpdate,
    @Inject(DOCUMENT) private document: Document
  ) { }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        console.log('A newer version is now available. Refresh the page now to update the cache');
        this.document.location.reload();
      });
      this.swUpdate.checkForUpdate();
    }
  }
}
