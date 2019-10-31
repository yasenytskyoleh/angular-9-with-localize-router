import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';

@Injectable()
export class ClockService {
    constructor(private http: TransferHttpService) {
    }

    getCurrentTime() {
        return this.http.get('http://worldclockapi.com/api/json/utc/now');
    }
}
