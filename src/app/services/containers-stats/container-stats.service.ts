import {Injectable, EventEmitter}              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContainersStatsService {

  containers:any;
  containersChanged:EventEmitter<any>;
  private heroesUrl = 'http://localhost:1111/stats/getDataFromAllHosts';

  constructor (private http: Http) {
    this.containersChanged = new EventEmitter<any>();
    this.containers = [];
  }

  fetchData():void {
    this.http.get(this.heroesUrl).subscribe((data) => {
      this.containers = data.json();
      this.containersChanged.emit(this.containers);
    });
  }

  registerToContainersChange(callback:any) {
    this.containersChanged.subscribe(callback);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
