import { Component, OnInit } from '@angular/core';
import { ClockService } from 'src/app/shared/services/clock/clock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentTime$: Observable<any>;
  constructor(private clockService: ClockService) { }

  ngOnInit() {
    this.currentTime$ = this.clockService.getCurrentTime();
  }

}
