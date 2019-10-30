import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public params: { key: string, value: string }[] = [];
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const paramMap = this.activatedRoute.snapshot.paramMap;
    this.params = paramMap.keys.map(key => ({ key, value: paramMap.get(key) }));
  }
}
